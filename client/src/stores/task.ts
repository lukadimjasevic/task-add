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
        computeTasksToday: (tasks: Task[]) => {
            const todayStart = new Date();
            const todayEnd = new Date();
            todayStart.setHours(0, 0, 0, 0);
            todayEnd.setHours(23, 59, 59, 999);
            const tasksToday = tasks.filter((task: Task) => 
                task.deadlineDate.getTime() >= todayStart.getTime() &&
                task.deadlineDate.getTime() < todayEnd.getTime()
            );
            update((current: TasksFrame) => current = { ...current, countToday: tasksToday.length });
            return tasksToday;
        },
        computeTasksTomorrow: (tasks: Task[]) => {
            const tomorrowStart = new Date();
            const tomorrowEnd = new Date();
            tomorrowStart.setHours(24, 0, 0, 0);
            tomorrowEnd.setHours(47, 59, 59, 999);
            const tasksTomorrow = tasks.filter((task: Task) => 
                task.deadlineDate.getTime() >= tomorrowStart.getTime() &&
                task.deadlineDate.getTime() < tomorrowEnd.getTime()
            );
            update((current: TasksFrame) => current = { ...current, countTomorrow: tasksTomorrow.length });
            return tasksTomorrow;
        },
        computeTasksWeek: (tasks: Task[]) => {
            const weekStart = new Date();
            const weekEnd = new Date();
            weekStart.setHours(48, 0, 0, 0);
            weekEnd.setHours(167, 59, 59, 999);
            const tasksWeek = tasks.filter((task: Task) => 
                task.deadlineDate.getTime() >= weekStart.getTime() &&
                task.deadlineDate.getTime() < weekEnd.getTime()
            );
            update((current: TasksFrame) => current = { ...current, countWeek: tasksWeek.length });
            return tasksWeek;
        },
        computeTasksFuture: (tasks: Task[]) => {
            const futureStart = new Date();
            futureStart.setHours(168, 0, 0, 0);
            const tasksFuture = tasks.filter((task: Task) => 
                task.deadlineDate.getTime() >= futureStart.getTime()
            );
            update((current: TasksFrame) => current = { ...current, countFuture: tasksFuture.length });
            return tasksFuture;
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
        reset: () => set(defaultValues),
    }
}

export const tasks = createTasks();
