"use server"

import { inngest } from "../../inngest/client"

export const triggerloopfun=async()=>{
    await inngest.send({
        name:'running/loop',
        data:{
        email:"roxian@gmail.com"
        }
    })
}