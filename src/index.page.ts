import { html } from "@stricjs/arrow/utils";
import link from "./components/link";
import background from "./components/background";

import "./styles/index.css";

export function render() {
    html`
        ${background}
        <main>
            <h1>Manage time in tests</h1>
            <p>A timer with tasks scheduling to help you practice</p>
            <button @click="${link("/create")}">Create one now</button>
        </main>
    `;
}

export const path = "/";
export const title = "Home";