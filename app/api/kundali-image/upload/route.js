import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "../../../lib/model/schema";
import { connectionSRT } from "../../../lib/db";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: "No image" }, { status: 400 });
    }

    // 🔒 Safety guard
    if (imageBase64.length > 1_000_000) {
      return NextResponse.json(
        { success: false, error: "Image too large" },
        { status: 400 }
      );
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    await User.findByIdAndUpdate(session.user.id, {
      $push: {
        kundaliImageUploads: {
          imageBase64,
          uploadedAt: new Date(),
          analyzed: false,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
