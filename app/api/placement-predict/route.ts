import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || ""
});

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { tenthMarks, twelfthMarks, cgpa, interests, skills, knowledge } = data;

        const prompt = `
      You are an expert career and placement counselor. Analyze this student's profile concisely.
      
      Student Profile:
      - 10th Marks: ${tenthMarks}%
      - 12th Marks: ${twelfthMarks}%
      - CGPA: ${cgpa}
      - Area of Interest: ${interests}
      - Technical Skills: ${skills}
      - Language/Concept Knowledge: ${knowledge}

      Provide your analysis in RAW JSON format only. No extra text, no markdown blocks. 
      The content should be precise and high-impact.

      Return exactly this JSON structure:
      {
        "status": "Eligible" | "Borderline" | "Highly Eligible",
        "eligibilityNote": "Short note on placement eligibility.",
        "topStrengths": ["Strength 1", "Strength 2", "Strength 3"],
        "roadmap": ["Actionable step 1", "Actionable step 2", "Actionable step 3"],
        "targetCompanies": ["Company Name 1", "Company Name 2" or "High-level Startups", etc.],
        "industryInsight": "Short summary of market demand."
      }
    `;

        // Try models in order based on user's feedback and SDK compatibility
        const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-3-flash-preview"];
        let text = "";
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Trying model: ${modelName}`);
                const response = await ai.models.generateContent({
                    model: modelName,
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                });
                text = response.text || "";
                if (text) {
                    console.log(`Success with model: ${modelName}`);
                    break;
                }
            } catch (e: any) {
                console.warn(`Model ${modelName} failed:`, e.message);
                lastError = e;
            }
        }

        if (!text) {
            throw new Error(lastError?.message || "Internal AI engine is calibrating. Please try again in a few seconds.");
        }

        // Clean up and parse JSON
        const jsonPart = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const resultJson = JSON.parse(jsonPart);

        return NextResponse.json({ result: resultJson });
    } catch (error: any) {
        console.error("AI API Error:", error);
        return NextResponse.json(
            { error: error.message || "Engine Error. Our custom AI is currently undergoing maintenance." },
            { status: 500 }
        );
    }
}
