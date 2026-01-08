import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);

export async function runllm(
  input1, // username
  input2, // email
  input3, // password (DO NOT SEND TO LLM)
  input4, // full name
  input5, // date of birth
  input6, // time of birth
  input7  // place of birth
) {
  // 🔐 1️⃣ User meta (NOT for LLM, but REQUIRED for DB)
  const userMeta = {
    username: String(input1),
    email: String(input2),
    password: String(input3), // ✅ REQUIRED by DB route
  };

  // 🔮 2️⃣ Astrology-safe input (ONLY this goes to LLM)
  const birthDetails = {
    fullName: String(input4),
    dateOfBirth: String(input5),
    timeOfBirth: String(input6),
    placeOfBirth: String(input7),
  };

  // 🧠 3️⃣ Gemini model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  // 🧾 4️⃣ Prompt (FORCED JSON, NO REFUSAL)
  const prompt = `
You are an expert Vedic astrologer.

IMPORTANT RULES:
- Never refuse.
- Never ask for missing data.
- Approximate when exact calculation is not possible.
- Do not include markdown or explanations.

Birth details:
- Full Name: ${birthDetails.fullName}
- Date of Birth: ${birthDetails.dateOfBirth}
- Time of Birth: ${birthDetails.timeOfBirth}
- Place of Birth: ${birthDetails.placeOfBirth}

Return ONLY valid JSON with this schema:

{
  "basicProfile": {
    "sunSign": "",
    "moonSign": "",
    "ascendant": "",
    "nakshatra": "",
    "rulingPlanet": ""
  },
  "planetaryPositions": {
    "sun": { "sign": "", "house": "", "traits": "" },
    "moon": { "sign": "", "house": "", "traits": "" },
    "mars": { "sign": "", "house": "", "traits": "" },
    "mercury": { "sign": "", "house": "", "traits": "" },
    "jupiter": { "sign": "", "house": "", "traits": "" },
    "venus": { "sign": "", "house": "", "traits": "" },
    "saturn": { "sign": "", "house": "", "traits": "" },
    "rahu": { "sign": "", "house": "", "traits": "" },
    "ketu": { "sign": "", "house": "", "traits": "" }
  },
  "houses": {
    "house1": "", "house2": "", "house3": "", "house4": "",
    "house5": "", "house6": "", "house7": "", "house8": "",
    "house9": "", "house10": "", "house11": "", "house12": ""
  },
  "yogas": [
    { "name": "", "meaning": "" }
  ],
  "lifeDomains": {
    "personality": "",
    "career": "",
    "relationships": "",
    "health": "",
    "finance": ""
  },
  "guidance": {
    "strengths": [],
    "challenges": [],
    "advice": ""
  }
}
`;

  // 🤖 5️⃣ Call Gemini
  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // 🧹 6️⃣ Strip markdown if present
  if (text.startsWith("```")) {
    text = text.replace(/```json|```/g, "").trim();
  }

  let kundali;
  try {
    kundali = JSON.parse(text);
  } catch (err) {
    console.error("LLM RAW OUTPUT:", text);
    throw new Error("Invalid JSON returned by LLM");
  }

  // 🧱 7️⃣ FINAL PAYLOAD (DB-READY, VALIDATED SHAPE)
  const finalSchema = {
    meta: {
      generatedAt: new Date().toISOString(),
      model: "gemini-2.5-flash",
      system: "vedic",
    },
    user: {
      username: userMeta.username,
      email: userMeta.email,
      password: userMeta.password, // 🔥 REQUIRED BY API ROUTE
    },
    birthDetails,
    kundali,
  };

  // 🧪 Debug once if needed
  console.log("FINAL SCHEMA SENT TO DB:", finalSchema);

  return finalSchema;
}
