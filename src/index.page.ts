import { html } from "@stricjs/arrow/utils";
import link from "./components/link";

import "./styles/index.css";

export function render() {
    html`
        <div id="background"></div>
        <main>
            <h1>Manage time in tests</h1>
            <p>A timer with useful features to help you practice</p>
            <button @click="${link("/create")}">Create one now</button>
        </main>
    `;
}

export const path = "/";
export const title = "Home";