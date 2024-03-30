import { writable } from "svelte/store";
import type { TaskCategoryStore } from "taskadd/store";
import type { TaskCategoriesFrame, ExtendedTaskCategory } from "taskadd/task-category";
import type { Task } from "taskadd/task";

const defaultValues: TaskCategoriesFrame = {
    categories: [],
};

const createTaskCategories = (): TaskCategoryStore => {
    const { subscribe, set, update } = writable(defaultValues);

    const countCategories = (category: ExtendedTaskCategory, tasks: Task[]): number => {
        let count = 0;
        tasks.map((task: Task) => {
            count += task.categories.filter(({ id }) => id === category.id).length;
        });
        return count;
    }

    return {
        subscribe,
        set,
        update,
        setValues: (categories: ExtendedTaskCategory[], tasks: Task[]) => {
            const dataCategories: ExtendedTaskCategory[] = [];
            categories.forEach((category: ExtendedTaskCategory) => {
                dataCategories.push({
                    id: category.id,
                    name: category.name,
                    color: category.color,
                    createDate: category.createDate,
                    updateDate: category.updateDate,
                    count: countCategories(category, tasks),
                });
            });
            set({
                categories: dataCategories,
            });
        },
        reset: () => set(defaultValues),
    }
}

export const taskCategories = createTaskCategories();
