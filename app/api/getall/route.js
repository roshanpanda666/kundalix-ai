import mongoose from "mongoose"
import { connectionSRT } from "../../lib/db"
import {NextResponse}from "next/server"
import { User } from "../../lib/model/schema"
export async function  GET(){
    await mongoose.connect(connectionSRT)
    const data =await User.find()
    return NextResponse.json(data)
}