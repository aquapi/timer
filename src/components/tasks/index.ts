import { ArrowTemplate, template, Event, createForm, Component, ReactiveProxy, reactive } from "@stricjs/arrow/utils";

import "./index.css";
import minuteSuffix from "../../utils/minuteSuffix";

export interface Task {
    /**
     * Task name
     */
    readonly name: string;
    /**
     * Task duration
     */
    readonly duration: number;
}

export default class Tasks extends Component {
    /**
     * List of tasks
     */
    readonly list: ReactiveProxy<{ 
        [index: number]: Task
    }>;

    /**
     * Total task time to check whether user has exceed the time limit
     */
    totalTime: number;

    /**
     * The form states
     */
    readonly state: any;

    constructor(public timeLimit: number = 90) {
        super();
        this.list = reactive({});
        this.list.length = 0;
        this.totalTime = 0;
        this.state = createForm<Task>();

        // Bind all functions
        this.submit = this.submit.bind(this);
    }

    /**
     * Add a task
     */
    add(t: Task) {
        if (this.totalTime + t.duration >= this.timeLimit)
            return alert("You can't do that task! The time limit is " + this.timeLimit);

        this.list[this.list.length++] = reactive(t);
        this.totalTime += t.duration;

        return this;
    }

    /**
     * Delete the last task
     */
    remove(i: number) {
        this.totalTime -= this.list[i].duration;
        delete this.list[i];
    
        for (; i < this.list.length; ++i) 
            this.list[i] = this.list[i + 1];
        
        delete this.list[--this.list.length];

        return this;
    }

    /**
     * Save to a `Storage` instance. Defaukts to `sessionStorage`
     */
    store(storage = sessionStorage) {
        storage.setItem("tasks", JSON.stringify(this.list));
    }

    /**
     * Handle submit event
     * @param e the form submit event object
     */
    submit(e: Event<HTMLFormElement>) {
        e.preventDefault();

        this.add({
            name: this.state.name,
            duration: Number(this.state.duration)
        });
    }

    get template(): ArrowTemplate {
        return template`
            <p>Add tasks to complete:</p>
            <div id="tasks">${() => {
                let res = [];

                for (let i = 0; i < this.list.length; ++i) {
                    const { name, duration } = this.list[i];

                    res.push(template`<div class="task">
                        <div @click="${() => this.remove(i)}">-</div>
                        <p>${name} - ${minuteSuffix(duration)}</p>
                    </div>`);
                }

                return res;
            }}</div>
            <form @submit="${this.submit}" id="task-submit">
                <input 
                    name="name"
                    @input="${this.state.input("name")}"
                    placeholder="Name..." 
                    required
                />
                <input 
                    name="duration" 
                    type="number" 
                    @input="${this.state.input("duration")}" 
                    placeholder="Duration..."
                    required
                />
                <button type="submit">+</button>
            </form>
        `;
    }
}