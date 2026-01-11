import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { JSDOM } from "jsdom";

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

    // 2️⃣ DB CONNECT (SAFE)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    // 3️⃣ FETCH ONLY MOON SIGN
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

    // 4️⃣ BUILD DYNAMIC URL
    const url = `https://www.astrology.com/horoscope/daily/${moonSign}.html`;

    // 5️⃣ FETCH HOROSCOPE PAGE
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch horoscope" },
        { status: 500 }
      );
    }

    const html = await res.text();

    // 6️⃣ PARSE HTML → TEXT
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const paragraphs = document.querySelectorAll("main p");

    let text = "";

    paragraphs.forEach((p) => {
      const value = p.textContent?.trim();
      if (value && value.length > 40) {
        text += value + "\n\n";
      }
    });

    // 7️⃣ FALLBACK (DOM changes protection)
    if (!text) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) text = meta.getAttribute("content") || "";
    }

    // 8️⃣ RETURN CLEAN RESPONSE
    return NextResponse.json({
      success: true,
      data: {
        moonSign,              // "leo"
        moonSignLabel: moonSignRaw, // "Leo"
        date: new Date().toISOString().split("T")[0],
        horoscope: text.trim(),
        source: "astrology.com",
      },
    });

  } catch (err) {
    console.error("MOON HOROSCOPE ERROR:", err);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
