import { html } from "@stricjs/arrow/utils";
import formatTime from "./utils/formatTime";
import { Task } from "./components/tasks";
import minuteSuffix from "./utils/minuteSuffix";
import background from "./components/background";

import "./styles/start.css";
import { Timer } from "@stricjs/arrow/utils";

export async function render() {
    if (await Notification.requestPermission() !== "granted")
        return alert("Please allow notifications to be displayed!");

    if (!sessionStorage.getItem("time") || !sessionStorage.getItem("tasks"))
        return location.href = "/create";

    // Convert to millis
    const timeLimit = Number(sessionStorage.getItem("time")) * 60 * 1000;

    const taskList = JSON.parse(
        sessionStorage.getItem("tasks") as string
    ) as Task[];
    let i = 0, tasksDuration = taskList[0]?.duration || 0;

    // Create the timer
    const interval = new Timer(function () {
        // Check time for each task
        const task = taskList[i];
        if (task && this.now === tasksDuration) {
            const note = new Notification(task.name, {
                body: `It's been ${minuteSuffix(task.duration)}.\nYou should have done this task by now.`
            });

            setTimeout(() => note.close(), 10000);
            tasksDuration += taskList[++i].duration;
        }
    }, timeLimit).start();

    html`
        ${background}
        <p>${() => formatTime((timeLimit - interval.now) / 1000)}</p>
    `;
}

export const path = "/start";
export const title = "Counting down...";