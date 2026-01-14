export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "../../../lib/model/schema";
import { connectionSRT } from "../../../lib/db";
import { callVisionLLM } from "../../../lib/ai";

export async function POST() {
  try {
    /* =========================
       1️⃣ AUTHENTICATION
       ========================= */
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* =========================
       2️⃣ DATABASE CONNECTION
       ========================= */
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    /* =========================
       3️⃣ FETCH USER
       ========================= */
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    /* =========================
       4️⃣ FETCH LATEST IMAGE
       ========================= */
    const uploads = user.kundaliImageUploads || [];

    if (uploads.length === 0) {
      return NextResponse.json(
        { success: false, error: "No kundali image uploaded" },
        { status: 400 }
      );
    }

    const latestImage = uploads[uploads.length - 1];

    if (latestImage.analyzed) {
      return NextResponse.json(
        { success: false, error: "Latest image already analyzed" },
        { status: 400 }
      );
    }

    /* =========================
       5️⃣ VISION PROMPT
       ========================= */
    const prompt = `
You are an expert Vedic astrologer.

Analyze the provided Kundali image and do the following:
1. Extract all visible astrological information (houses, planets, signs).
2. Infer missing context if reasonably possible.
3. Provide clear, structured insights under:
   - Personality
   - Career
   - Relationships
   - Strengths
   - Cautions

Avoid generic advice. Be specific and grounded in astrology.
`;

    /* =========================
       6️⃣ CALL VISION LLM (BLOCKING)
       ========================= */
    const aiInsights = await callVisionLLM({
      imageBase64: latestImage.imageBase64,
      prompt,
    });

    if (!aiInsights) {
      return NextResponse.json(
        { success: false, error: "AI analysis failed" },
        { status: 500 }
      );
    }

    /* =========================
       7️⃣ SAVE RESULT
       ========================= */
    latestImage.aiInsights = aiInsights;
    latestImage.analyzed = true;

    await user.save();

    /* =========================
       8️⃣ RESPONSE
       ========================= */
    return NextResponse.json({
      success: true,
      data: {
        insights: aiInsights,
        analyzedAt: new Date().toISOString(),
      },
    });

} catch (error) {
    console.error("KUNDALI IMAGE ANALYZE ERROR:", error);
  
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
