import { inngest } from "./client";
import { helloswan } from "../util/functions/function1";


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },

  
);

const runmlfunction=inngest.createFunction(
    {id:"run-ml-function"},
    {event:"invoke/ml"},

    async({event,step})=>{
        //step 1
        const mlresult= await step.run("ml-step",async()=>{


        const mlrunning=await helloswan()

            return{
                mlrunning,
            }
        })
        console.log("step 3 is completed",mlresult);

        
    })



export const functions=[helloWorld,runmlfunction]