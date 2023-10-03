import { Hono } from "~/deps.ts";
import { handleIndex } from "./handle_index.tsx";

if (
    import.meta.main
) {
    const app = new Hono();

    app.get("/", handleIndex());

    await Deno.serve({ port: 8000 }, app.fetch).finished;
}