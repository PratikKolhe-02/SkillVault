import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  analysisResult: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);