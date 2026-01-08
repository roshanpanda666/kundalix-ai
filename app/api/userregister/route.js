import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectionSRT } from "../../lib/db";
import { User } from "../../lib/model/schema";

export async function POST(request) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionSRT);
    }

    const { user, birthDetails, kundali, meta } = await request.json();

    // 🛑 HARD VALIDATION
    if (
      !user ||
      !user.username ||
      !user.email ||
      !user.password ||
      !birthDetails ||
      !birthDetails.fullName ||
      !birthDetails.dateOfBirth ||
      !birthDetails.timeOfBirth ||
      !birthDetails.placeOfBirth ||
      !kundali ||
      !meta
    ) {
      console.error("INVALID PAYLOAD:", {
        user,
        birthDetails,
        kundali,
        meta,
      });

      return NextResponse.json(
        { success: false, error: "Invalid payload structure" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(String(user.password), 10);

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,

      name: birthDetails.fullName,
      dob: birthDetails.dateOfBirth,
      tob: birthDetails.timeOfBirth,
      place: birthDetails.placeOfBirth,

      kundaliSnapshots: [
        {
          generatedAt: meta.generatedAt || new Date(),
          model: meta.model || "gemini-2.5-flash",
          meta: { system: meta.system || "vedic" },

          birthDetails,
          basicProfile: kundali.basicProfile || {},
          planetaryPositions: kundali.planetaryPositions || {},
          houses: kundali.houses || {},
          yogas: kundali.yogas || [],
          lifeDomains: kundali.lifeDomains || {},
          guidance: kundali.guidance || {},
        },
      ],
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created with kundali snapshot",
    });
  } catch (err) {
    console.error("DB INSERT ERROR FULL:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });

    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
