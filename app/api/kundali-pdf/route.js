import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";
import { User } from "../../lib/model/schema";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { connectionSRT } from "../../lib/db";

export async function GET() {
  try {
    // 1️⃣ AUTH
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ DB CONNECT
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    // 3️⃣ FETCH USER
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const kundali = user.kundaliSnapshots?.[0];
    if (!kundali) {
      return NextResponse.json({ error: "No kundali found" }, { status: 404 });
    }

    // 4️⃣ CREATE PDF
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 800;

    const draw = (text = "", size = 12) => {
      page.drawText(String(text), {
        x: 40,
        y,
        size,
        font,
        color: rgb(0, 0, 0), // 🔥 BLACK TEXT (FIX)
        maxWidth: 515,
        lineHeight: size + 4,
      });

      y -= size + 8;

      if (y < 60) {
        page = pdfDoc.addPage([595, 842]); // 🔥 PAGE SWITCH (FIX)
        y = 800;
      }
    };

    // 5️⃣ CONTENT
    draw("KUNDALIX — VEDIC KUNDALI REPORT", 18);
    draw("—————————————————————————————");
    draw("");

    draw(`Name: ${user.name}`);
    draw(`Date of Birth: ${user.dob}`);
    draw(`Time of Birth: ${user.tob}`);
    draw(`Place of Birth: ${user.place}`);

    draw("");
    draw("BASIC PROFILE", 14);
    draw(`Sun Sign: ${kundali.basicProfile.sunSign}`);
    draw(`Moon Sign: ${kundali.basicProfile.moonSign}`);
    draw(`Ascendant: ${kundali.basicProfile.ascendant}`);
    draw(`Nakshatra: ${kundali.basicProfile.nakshatra}`);
    draw(`Ruling Planet: ${kundali.basicProfile.rulingPlanet}`);

    draw("");
    draw("LIFE DOMAINS", 14);
    Object.entries(kundali.lifeDomains).forEach(([key, value]) => {
      draw(`${key.toUpperCase()}:`);
      draw("");
      draw(value);
      draw("");
      draw("");

    });


    draw("PLANETARY POSITIONS", 14);
    Object.entries(kundali.planetaryPositions).forEach(([planet, data]) => {
      draw(
        `${planet.toUpperCase()}: ${data.sign} · House ${data.house}`
      );
      draw("");
      draw(data.traits);
      draw("");
      draw("");

    });

    draw("YOGAS", 14);
    kundali.yogas.forEach((yoga) => {
      draw(`${yoga.name}:`);
      draw("");
      draw(yoga.meaning);
      draw("");
      draw("");

    });

    draw("GUIDANCE", 14);
    draw("");
    draw("Strengths:");
    draw("");
    kundali.guidance.strengths.forEach((s) => draw(`• ${s}`));
    draw("");
    draw("");
    draw("Challenges:");
    kundali.guidance.challenges.forEach((c) => draw(`• ${c}`));
    draw("");

    draw("Advice:");
    draw("");
    draw(kundali.guidance.advice);


    // 6️⃣ FINALIZE
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=kundali.pdf",
      },
    });
  } catch (err) {
    console.error("PDF ERROR:", err);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
