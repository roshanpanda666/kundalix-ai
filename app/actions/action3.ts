"use server"
import { inngest } from "../../inngest/client"
export async function thirdfunction(inputs:{
    input1:string
    input2:string
    input3:string
    input4:string
    input5:string
    input6:string
    input7:string
}){
    await inngest.send({
        name:"invoke/llm",
        data:inputs
    })
}