import { Html } from "~/jsx/dom/html.tsx";
import { Handler } from "~/deps.ts";

export function handleError(): Handler {
    return (c) => {
        return c.html(
            <Html head={{ title: "Oh, no!" }}>
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
                            Oh, no!
                        </h1>
                        <h2>Looks like we found an error</h2>
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
