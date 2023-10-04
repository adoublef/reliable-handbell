import { Hono, logger } from "~/deps.ts";
import { handleIndex } from "./handle_index.tsx";
import { serve } from "~/lib/serve.ts";
import { handleAbout } from "./handle_about.tsx";

if (
    import.meta.main
) {
    const app = new Hono();

    app.use("*", logger())    
    app.get("/", handleIndex());
    app.get("/about", handleAbout());

    await serve(app);
}

