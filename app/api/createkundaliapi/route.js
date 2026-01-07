//approach not in use

import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { User } from "../../lib/model/schema";
import { connectionSRT } from "../../lib/db";

export async function POST(request) {
  try {
    await mongoose.connect(connectionSRT);

    const payload = await request.json();

    const user = new User({
      name: payload.name,
      dob: payload.dob,
      tob: payload.tob,
      place: payload.place,
    });

    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
