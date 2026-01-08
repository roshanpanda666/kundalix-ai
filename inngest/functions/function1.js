import { utilfunction } from "../../app/util/functions/function1";
import { runllm } from "../../app/util/functions/llmfunction";
import { inngest } from "../client";

export const helloworld = inngest.createFunction(
  { id: "hello-world-function" },
  { event: "test/helloworld" },

  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `hello ${event.data.mail}` };
  }
);

export const loopfun = inngest.createFunction(
  { id: "runloop" },
  { event: "running/loop" },

  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "3");
    const result = await utilfunction();
    return { result };
  }
);

export const llmtrigger = inngest.createFunction(
  { id: "call-llm-function" },
  { event: "invoke/llm" },

  async ({ event, step }) => {
    // 🧠 STEP 1 — Run LLM
    const llmResult = await step.run("generate-kundali-llm", async () => {
      const {
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
        input7,
      } = event.data;

      return await runllm(
        input1, // username
        input2, // email
        input3, // password (raw)
        input4, // full name
        input5, // dob
        input6, // tob
        input7  // place
      );
    });

    // 🗄️ STEP 2 — Persist to DB via API route
    const dbResponse = await step.run(
      "save-user-and-kundali",
      async () => {
        const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/userregister`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(llmResult),
          }
        );

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`DB insert failed: ${errText}`);
        }

        return await res.json();
      }
    );

    // ✅ RETURN → visible in Inngest dashboard
    return {
      status: "LLM + DB pipeline complete",
      llmPreview: {
        username: llmResult.user.username,
        email: llmResult.user.email,
      },
      dbResponse,
    };
  }
);

export const functions = [helloworld, loopfun, llmtrigger];
