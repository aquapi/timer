import { html, createForm, template } from "@stricjs/arrow/utils";
import Tasks from "./components/tasks";
import background from "./components/background";

import "./styles/create.css";

export function render() {
    const form = createForm({ time: "90" });
    const tasks = new Tasks();

    function submit() {
        // Set time and tasks
        sessionStorage.setItem("time", form.time);
        tasks.store();

        // Redirect to start the timer
        location.href = "/start";
    }

    // Handle time limit change
    const timeList = ["90", "120", "150"];
    form.data.$on("time", (v, old) => {
        tasks.timeLimit = Number(v);

        // Set to the old value if task value is not valid
        if (tasks.timeLimit <= tasks.totalTime) {
            // @ts-ignore
            document.querySelector("select").selectedIndex = 
                timeList.indexOf(old);
            form.data.time = old;

            return alert(
                "You cannot change the time limit right now!"
                + "Delete some tasks first!"
            );
        }
    });

    html`
        ${background}
        <main>
            <h2>Create a timer</h2>
            <form>
                <!-- Select time limit -->
                <div id="time">
                    <p>Time limit:</p>
                    <select name="time" @change="${form.select("time")}">
                        ${timeList.map(v => template`<option value="${v}">
                            ${v} minutes
                        </option>`)}
                    </select>
                </div>

                <!-- Add tasks -->
                ${tasks.template}
            </form>

            <br />
            <button @click="${submit}">Start</button>
        </main>
    `;
}

export const path = "/create";
export const title = "Create a timer";