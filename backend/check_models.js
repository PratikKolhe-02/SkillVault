// backend/check_models.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// 1. Manually Load Key (Same logic as your controller)
const loadApiKey = () => {
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

const apiKey = loadApiKey();
console.log(`\n🔑 Testing Key: ${apiKey ? apiKey.substring(0, 8) + "..." : "MISSING"}`);

if (!apiKey) {
    console.error("❌ ERROR: Could not read API Key from .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("📡 Connecting to Google...");
        // This specific call asks for the list of models
        const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }).apiKey; // Dummy call to init
        
        // We use a raw fetch because the SDK hides the list method sometimes
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.error) {
            console.error("\n❌ API ERROR:", data.error.message);
            console.log("\n💡 FIX: Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com and ENABLE the API.");
        } else if (data.models) {
            console.log("\n✅ SUCCESS! Your key has access to:");
            data.models.forEach(m => {
                // Only show generateContent models
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`   - ${m.name.replace("models/", "")}`);
                }
            });
            console.log("\n👉 Copy one of these names into your resumeController.js");
        } else {
            console.log("\n⚠️ WEIRD: No models returned, but no error either.");
        }

    } catch (error) {
        console.error("\n❌ CONNECTION FAILED:", error.message);
    }
}

listModels();