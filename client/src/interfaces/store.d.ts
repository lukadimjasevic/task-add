declare module "taskadd/store" {
    import type { Writable } from "svelte/store";
    import type { Task } from "taskadd/task";

    export interface CustomStore extends Writable<T> {
        setValues(values: any): void;
        reset(): void;
    }

    export interface UserStore extends CustomStore {
        setVerified(verified: boolean): void;
        setVerificationCodeLastDate(date: Date): void;
        setOtpEnabled(enabled: boolean): void;
        setOtpGenerated(generated: boolean): void;
    }

    export interface UserOTPStore extends CustomStore {
        setToken(token: string): void;
    }

    export interface TaskStore extends CustomStore {
        toggleSelectedTask(task: Task): void;
        toggleSelectedTasks(tasks: Task[], state: boolean): void;
        computeTasksToday(tasks: Task[]): Task[];
        computeTasksTomorrow(tasks: Task[]): Task[];
        computeTasksWeek(tasks: Task[]): Task[];
        computeTasksFuture(tasks: Task[]): Task[];
        resetSelected(): void;
    }
}