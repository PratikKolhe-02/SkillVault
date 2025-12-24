import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeAnalysis } from '../models/ResumeAnalysis.js';

const require = createRequire(import.meta.url);
const PDFParser = require('pdf2json'); 

const loadApiKey = () => {
    if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const fileContent = fs.readFileSync(envPath, 'utf-8');
            const match = fileContent.match(/GEMINI_API_KEY=(.*)/);
            if (match && match[1]) return match[1].replace(/["'\r]/g, '').trim();
        }
    } catch (e) { console.error(e); }
    return null;
};

export const analyzeResume = async (req, res) => {
    try {
        // Security Check
        if (!req.user) {
            return res.status(401).json({ message: "Please login to use this feature" });
        }

        const apiKey = loadApiKey();
        if (!apiKey) return res.status(500).json({ message: "API Key missing." });

        const genAI = new GoogleGenerativeAI(apiKey);
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // 1. Parse PDF
        const pdfParser = new PDFParser(null, 1);
        const textContent = await new Promise((resolve, reject) => {
            pdfParser.on("pdfParser_dataError", (errData) => reject(new Error(errData.parserError)));
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                try {
                    let extractedText = "";
                    pdfData.Pages.forEach(page => {
                        if (page.Texts) {
                            page.Texts.forEach(textBlock => {
                                textBlock.R.forEach(run => {
                                    try { extractedText += decodeURIComponent(run.T) + " "; } 
                                    catch (e) { extractedText += run.T + " "; }
                                });
                            });
                        }
                        extractedText += "\n"; 
                    });
                    resolve(extractedText);
                } catch (err) { reject(err); }
            });
            pdfParser.loadPDF(req.file.path);
        });

        // 2. Prepare Prompt
        const prompt = `
        You are an expert Technical Recruiter. Analyze this resume text.
        Return a response in this structure:
        1. **ATS Score**: (0-100)
        2. **Feedback**: (3 bullet points)
        3. **Missing Keywords**: (List of tech skills missing)
        4. **Course Suggestions**: (3 specific courses)
        RESUME TEXT: ${textContent}
        `;

        // 3. Generate Content
        const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];
        let finalResponse = null;

        for (const modelName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                finalResponse = response.text();
                break; 
            } catch (error) {
                if (error.message.includes("404") || error.message.includes("Not Found")) continue;
                throw error;
            }
        }

        if (!finalResponse) throw new Error("AI models failed to respond.");

        // 4. Save to Database (Silently)
        try {
            await ResumeAnalysis.create({
                userId: req.user._id || req.user.id,
                analysisResult: finalResponse
            });
        } catch (dbError) {
            console.error("Failed to save history:", dbError.message);
        }

        res.status(200).json({ analysis: finalResponse });

    } catch (error) {
        console.error("Analysis Failed:", error);
        res.status(500).json({ message: "Analysis Failed", error: error.message });
    }
};

export const getResumeHistory = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not identified" });
        
        const history = await ResumeAnalysis.find({ userId: req.user._id || req.user.id })
                                            .sort({ createdAt: -1 });
        
        res.status(200).json({ history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};