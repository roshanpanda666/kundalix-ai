import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { functions } from "../../../inngest/functions/function1";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  
    /* your functions will be passed here later! */
    functions:functions,
});
