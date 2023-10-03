import { Hono } from "~/deps.ts";
import { handleIndex } from "./handle_index.tsx";
import { serve } from "../../lib/serve.ts";

if (
    import.meta.main
) {
    const app = new Hono();

    app.get("/", handleIndex());

    await serve(app);
}

