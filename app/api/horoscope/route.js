export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import * as cheerio from "cheerio";

import { authOptions } from "../auth/[...nextauth]/route";
import { connectionSRT } from "../../lib/db";
import { User } from "../../lib/model/schema";

export async function GET() {
  try {
    // 1️⃣ AUTH
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ DB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    // 3️⃣ MOON SIGN
    const user = await User.findById(session.user.id).select(
      "kundaliSnapshots.basicProfile.moonSign"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const moonSignRaw =
      user.kundaliSnapshots?.[0]?.basicProfile?.moonSign;

    if (!moonSignRaw) {
      return NextResponse.json(
        { success: false, error: "Moon sign not found" },
        { status: 404 }
      );
    }

    const moonSign = moonSignRaw.toLowerCase().trim();

    // 4️⃣ FETCH PAGE
    const url = `https://www.astrology.com/horoscope/daily/${moonSign}.html`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch horoscope page");
    }

    const html = await res.text();

    // 5️⃣ PARSE WITH CHEERIO (SAFE)
    const $ = cheerio.load(html);

    let horoscope = "";

    $("main p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 60) {
        horoscope += text + "\n\n";
      }
    });

    // 6️⃣ FALLBACK
    if (!horoscope) {
      horoscope =
        $('meta[name="description"]').attr("content") ||
        "Horoscope not available today.";
    }

    // 7️⃣ RETURN
    return NextResponse.json({
      success: true,
      data: {
        moonSign,
        moonSignLabel: moonSignRaw,
        date: new Date().toISOString().split("T")[0],
        horoscope: horoscope.trim(),
        source: "astrology.com",
      },
    });

  } catch (err) {
    console.error("HOROSCOPE PROD ERROR:", err);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
