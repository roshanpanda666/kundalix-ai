import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);

export async function POST(req) {
  try {
    const { message, user } = await req.json();

    if (!message || !user) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const kundali = user.kundaliSnapshots?.[0];

    const systemPrompt = `
You are an AI named **VED**.

You are:
- A calm, wise, professional Vedic astrologer
- You speak clearly, confidently, and compassionately
- You NEVER say "as an AI model"
- You answer using Vedic astrology logic

USER PROFILE:
Name: ${user.name}
DOB: ${user.dob}
TOB: ${user.tob}
Place: ${user.place}

KUNDALI DATA:
${JSON.stringify(kundali, null, 2)}

INSTRUCTIONS:
- Answer the user's question astrologically
- Use kundali references when relevant
- Be grounded, not mystical nonsense
- If unsure, give probabilistic guidance
- output should be within 100 words
- if user asks one liner answer not related to your business answer him the relevant answer 
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("VED CHAT ERROR:", err);
    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}
