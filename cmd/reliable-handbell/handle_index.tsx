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

    return c => {
        const { q: name } = parseDto(c.req.query());

        return c.html(
            <Html head={{ title: "Home", baseUrl: c.req.url }}>
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
                <main>hello {name ?? "world"} from deno</main>
                <footer>
                    <small>Powered by Deno</small>
                </footer>
            </Html>
        );
    };
}