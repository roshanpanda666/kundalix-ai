"use server"

import { inngest } from "../../inngest/client"

export const triggerhelloworld=async()=>{
    await inngest.send({
        name:'test/helloworld',
        data:{
        email:"roxian@gmail.com"
        }
    })
}
