// lib/ai.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function callVisionLLM({ imageBase64, prompt }) {
  if (!imageBase64) {
    throw new Error("No image provided");
  }

  const matches = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid base64 image");
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  if (base64Data.length > 4_000_000) {
    throw new Error("Image too large for Gemini Vision");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // ✅ Vision supported
  });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini returned empty output");
    }

    return text;
  } catch (error) {
    console.error("===== GEMINI VISION ERROR =====");
    console.error(error);
    throw error;
  }
}
