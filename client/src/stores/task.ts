import { writable } from "svelte/store";
import type { TaskStore } from "taskadd/store";
import type { TasksFrame, Task, TaskCategory } from "taskadd/task";

const defaultValues: TasksFrame = {
    tasks: [],
    countActive: 0,
    countUpcoming: 0,
    countToday: 0,
    countTomorrow: 0,
    countWeek: 0,
    countFuture: 0,
};

const createTasks = (): TaskStore => {
    const { subscribe, set, update } = writable(defaultValues);

    const prepareTask = (task: Task): Task => {
        const dataTask: Task = {
            id: task.id,
            deadlineDate: new Date(task.deadlineDate),
            description: task.description,
            name: task.name,
            createDate: new Date(task.createDate),
            updateDate: new Date(task.updateDate),

            status: {
                color: task.status!.color,
                name: task.status!.name,
            },

            categories: [],

            selected: false,
        };

        // Task Categories
        const dataCategories: TaskCategory[] = [];
        task.categories!.forEach((category: TaskCategory) => {
            const dataCategory: TaskCategory = {
                color: category.color,
                name: category.name,
                createDate: category.createDate,
                updateDate: category.updateDate,
            }
            dataCategories.push(dataCategory);
        });
        dataTask.categories = dataCategories;
        
        return dataTask;
    }

    const countActive = (tasks: Task[]): number => {
        return tasks.filter((task: Task) => task.status.name.toLowerCase() === "active").length;
    }

    const countUpcoming = (tasks: Task[]): number => {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        return tasks.filter((task: Task) => task.deadlineDate.getTime() >= todayStart.getTime()).length;
    }

    return {
        subscribe,
        set,
        update,
        setValues: (values: Task[]) => {
            const dataTasks: Task[] = [];
            values.forEach((task: Task) => {
                const dataTask = prepareTask(task);
                dataTasks.push(dataTask);
            });
            set({
                ...defaultValues,
                tasks: dataTasks,
                countActive: countActive(dataTasks),
                countUpcoming: countUpcoming(dataTasks),
            });
        },
        toggleSelectedTask: (task: Task) => {
            update((current: TasksFrame) => {
                const updatedTasks = current.tasks.map((currentTask: Task) => {
                    if (currentTask.id === task.id) return { ...currentTask, selected: !task.selected };
                    return currentTask;
                });
                return {
                    ...current,
                    tasks: updatedTasks,
                };
            });
        },
        toggleSelectedTasks: (tasks: Task[], state: boolean) => {
            update((current: TasksFrame) => {
                const updatedTasks = current.tasks.map((currentTask: Task) => {
                    if (tasks.includes(currentTask)) {
                        return { ...currentTask, selected: state };
                    }
                    return currentTask;
                });
                return {
                    ...current,
                    tasks: updatedTasks,
                };
            });
        },
        resetSelected: () => {
            update((current: TasksFrame) => {
                return {
                    ...defaultValues,
                    tasks: current.tasks.map((currentTask: Task) => {
                        return { ...currentTask, selected: false };
                    }),
                };
            });
        },
        setCountToday: (count: number) => {
            update((current: TasksFrame) => current = { ...current, countToday: count });
        },
        setCountTomorrow: (count: number) => {
            update((current: TasksFrame) => current = { ...current, countTomorrow: count });
        },
        setCountWeek: (count: number) => {
            update((current: TasksFrame) => current = { ...current, countWeek: count });
        },
        setCountFuture: (count: number) => {
            update((current: TasksFrame) => current = { ...current, countFuture: count });
        },
        reset: () => set(defaultValues),
    }
}

export const tasks = createTasks();
