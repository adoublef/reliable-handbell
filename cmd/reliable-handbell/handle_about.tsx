import { Handler, } from "~/deps.ts";
import { Html } from "~/jsx/dom/html.tsx";

export function handleAbout(): Handler {
    return c => {
        return c.html(
            <Html head={{ title: "About" }}>
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
                        <h1>About</h1>
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