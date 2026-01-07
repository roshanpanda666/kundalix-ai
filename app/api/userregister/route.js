import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { User } from "../../lib/model/schema";
import { connectionSRT } from "../../lib/db";

export async function POST(request) {
  try {
    await mongoose.connect(connectionSRT);

    const payload = await request.json();

    // 🔐 HASH PASSWORD ON SERVER
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = new User({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      name:payload.name,
      dob:payload.dob,
      tob:payload.tob,
      place:payload.place,
    });

    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

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
