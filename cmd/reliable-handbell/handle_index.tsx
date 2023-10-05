import { Client, HTTPException, Handler, Output, Status, maxBytes, object, optional, parse, string, transform } from "~/deps.ts";
import { Html } from "~/jsx/dom/html.tsx";

export function handleIndex(): Handler {
    const dto = transform(object({
        q: optional(string([maxBytes(8)]))
    }), ({ q }) => ({ q: q ?? "world" }));

    const parseDto = (data: unknown): Output<typeof dto> => {
        try {
            return parse(dto, data);
        } catch (error) {
            throw new HTTPException(Status.BadRequest, { message: "error parsing dto" });
        }
    };

    // TODO -- getName from database
    const getName = async (c: Client, name: string) => {
        // NOTE -- throw internal error if there is an error
        const rs = ((await c.execute({
            sql: "SELECT ?", args: [name]
        })).rows.at(0)!);

        return (rs)[0] as string;
    };

    return async (c) => {
        const { q } = parseDto(c.req.query());

        const name = await getName(c.get("db"), q)

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
                            Hello, {name}!
                        </h1>
                        <h2>Still under construction 👷🏿</h2>
                    </hgroup>
                    <p>
                        For the meantime you can set your name via the header using the <code>q</code> parameter.
                        The maximum value for this is 20. You will be greeted in the header
                    </p>
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