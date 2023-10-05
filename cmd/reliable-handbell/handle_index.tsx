import { HTTPException, Handler, Output, Status, maxBytes, object, optional, parse, string } from "~/deps.ts";
import { Html } from "~/jsx/dom/html.tsx";

export function handleIndex(): Handler {
    const dto = object({
        q: optional(string([maxBytes(8)]))
    });

    const parseDto = (data: unknown): Output<typeof dto> => {
        try {
            return parse(dto, data);
        } catch (error) {
            throw new HTTPException(Status.BadRequest, { message: "error parsing dto" });
        }
    };

    // TODO -- getName from database

    return c => {
        const { q: name } = parseDto(c.req.query());

        return c.html(
            <Html head={{ title: "Home" }}>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <hgroup>
                        <h1>
                            Hello, {name ?? "world"}!
                        </h1>
                        <h2>Still under construction 👷🏿</h2>
                    </hgroup>
                </main>
                <footer>
                    <small>
                        Powered by <a hx-boost={false} href="https://deno.com">Deno</a>.
                        Source code on <a hx-boost={false} href="https://github.com/adoublef/reliable-handbell">GitHub</a>
                    </small>
                </footer>
            </Html>
        );
    };
}