import { env } from "~/lib/env.ts";
import { Hono, logger } from "~/deps.ts";
import { serve } from "~/lib/serve.ts";
import { handleIndex } from "./handle_index.tsx";
import { handleAbout } from "./handle_about.tsx";
import { handleError } from "./handle_error.tsx";
import { ping, turso } from "~/lib/turso.ts";
import { createClient } from "~/lib/libsql/mod.ts";

if (
    import.meta.main
) {
    const db = createClient({ url: env("DATABASE_URL") });
    await ping(db);

    const app = new Hono()
        .use("*", logger())
        .use("*", turso(db))
        .onError((_err, c) => c.redirect("/ouch"));

    app.get("/", handleIndex());
    app.get("/about", handleAbout());
    app.get("/ouch", handleError());

    await serve(app);

    // TODO -- handle graceful shutdown
    // required to sync changes to Turso
}

