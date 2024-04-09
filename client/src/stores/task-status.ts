import { writable } from "svelte/store";
import type { TaskStatusStore } from "taskadd/store";
import type { TaskStatusesFrame, TaskStatus } from "taskadd/task-status";

const defaultValues: TaskStatusesFrame = {
    statuses: [],
};

const createTaskStatuses = (): TaskStatusStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        setValues: (statuses: TaskStatus[]) => {
            const dataStatuses: TaskStatus[] = [];
            statuses.forEach((status: TaskStatus) => {
                dataStatuses.push({
                    name: status.name,
                    color: status.color,
                });
            });
            set({
                statuses: dataStatuses,
            });
        },
        reset: () => set(defaultValues),
    }
}

export const taskStatuses = createTaskStatuses();
