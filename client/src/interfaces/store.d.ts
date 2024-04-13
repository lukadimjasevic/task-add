declare module "taskadd/store" {
    import type { Writable } from "svelte/store";
    import type { Task } from "taskadd/task";
    import type { TaskCalendar } from "taskadd/task-calendar";
    import type { ExtendedTaskCategory } from "taskadd/task-category";
    import type { TaskStatus } from "taskadd/task-status";
    import type { Toast, ToastOptions } from "taskadd/toast";

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

    export interface TaskCalendarStore extends CustomStore {
        setValues(selector: TaskCalendar["selector"]): void;
        toggleDate(offset: number): void;
    }

    export interface TaskCategoryStore extends CustomStore {
        setValues(categories: ExtendedTaskCategory[], tasks: Task[]): void;
        updateCount(tasks: Task[]): void;
    }

    export interface TaskStatusStore extends CustomStore {
        setValues(statuses: TaskStatus[]): void;
    }

    export interface ToastStore extends Writable<T> {
        add(type: Toast["type"], title: Toast["title"], description: Toast["description"], options: ToastOptions): void;
        remove(toast: Toast): void;
        success(title: Toast["title"], description: Toast["description"], options?: ToastOptions): void;
        error(title: Toast["title"], description: Toast["description"], options?: ToastOptions): void;
    }
}