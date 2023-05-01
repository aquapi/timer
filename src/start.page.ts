import { html, reactive } from "@stricjs/arrow/utils";
import formatTime from "./utils/formatTime";
import { Task } from "./components/tasks";
import minuteSuffix from "./utils/minuteSuffix";
import background from "./components/background";

import "./styles/start.css";

export async function render() {
    if (await Notification.requestPermission() !== "granted")
        return alert("Please allow notifications to be displayed!");

    if (!sessionStorage.getItem("time") || !sessionStorage.getItem("tasks"))
        return location.href = "/create";

    const timeLimit = Number(sessionStorage.getItem("time")) * 60;
    const countDown = reactive({ seconds: timeLimit });

    const taskList = JSON.parse(
        sessionStorage.getItem("tasks") as string
    ) as Task[];
    let i = 0;

    const interval = setInterval(() => {
        // Check if time's up
        if (countDown.seconds === 0) {
            clearInterval(interval);
            alert("Time's up! Now going back to homepage!");
            return location.href = "/";
        }

        // Check time for each task
        const task = taskList[i];
        if (task && timeLimit - countDown.seconds === task.duration * 60) {
            const note = new Notification(task.name, {
                body: `It's been ${minuteSuffix(task.duration)}.\nYou should have done this task by now`
            });

            setTimeout(() => note.close(), 10000);
            ++i;
        }

        --countDown.seconds;
    }, 1000);

    html`
        ${background}
        <p>${() => formatTime(countDown.seconds)}</p>
    `;
}

export const path = "/start";
export const title = "Counting down...";