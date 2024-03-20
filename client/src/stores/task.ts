import { writable } from "svelte/store";
import type { TaskStore } from "taskadd/store";
import type { TasksFrame, Task, TaskCategory } from "taskadd/task";

const defaultValues: TasksFrame = {
    tasks: [],
    tasksSelected: {
        count: 0,
        selected: false,
    }
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
    
    const countSelected = (tasks: Task[]) => {
        return tasks.filter((task: Task) => task.selected).length;
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
                tasks: dataTasks,
                tasksSelected: {
                    count: 0,
                    selected: false,
                },
            });
        },
        toggleSelected: (taskId: number) => {
            update((current: TasksFrame) => {
                const updatedTasks = current.tasks.map((task: Task) => {
                    if (task.id === taskId) return { ...task, selected: !task.selected };
                    return task;
                });
                const updatedCount = countSelected(updatedTasks);
                const updatedSelectedAll = current.tasksSelected.selected && updatedCount === current.tasks.length ? true : false;
                return {
                    tasks: updatedTasks,
                    tasksSelected: {
                        count: updatedCount,
                        selected: updatedSelectedAll,
                    },
                };
            });
        },
        toggleAllSelected: () => {
            update((current: TasksFrame) => {
                const updatedTasks = current.tasks.map((task: Task) => {
                    return { ...task, selected: !current.tasksSelected.selected };
                });
                return {
                    tasks: updatedTasks,
                    tasksSelected: {
                        count: countSelected(updatedTasks),
                        selected: !current.tasksSelected.selected,
                    },
                };
            });
        },
        resetSelected: () => {
            update((current: TasksFrame) => {
                return {
                    tasks: current.tasks.map((task: Task) => {
                        return { ...task, selected: false };
                    }),
                    tasksSelected: {
                        count: 0,
                        selected: false,
                    },
                };
            });
        },
        reset: () => set(defaultValues),
    }
}

export const tasks = createTasks();
