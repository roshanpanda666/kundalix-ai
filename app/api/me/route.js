import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectionSRT } from "../../lib/db";
import { User } from "../../lib/model/schema";

export async function GET(){
    try{

        //get session
        const session=await getServerSession(authOptions)

        if(!session){
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
              );
        }

        //connect to db

        await mongoose.connect(connectionSRT)

        //fetch full user using session id
        const user=await User.findById(session.user.id).select("-password")

        if(!user){
            return NextResponse.json(
                { success: false, error: "User not found" },
                {status:404}
            )
        }

        // 4️⃣ Return full profile
    return NextResponse.json({
        success: true,
        user,
      });
    }catch (error) {
        console.error("ME ROUTE ERROR:", error);
    
        return NextResponse.json(
          { success: false, error: "Server error" },
          { status: 500 }
        );
      }
}