import { writable } from "svelte/store";
import type { TaskCategoryFormStore } from "taskadd/store";
import type { ExtendedTaskCategory } from "taskadd/task-category";

const defaultValues: ExtendedTaskCategory[] = [];

const createTaskCategoriesForm = (): TaskCategoryFormStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        toggleCategory: (category: ExtendedTaskCategory) => {
            update((current: ExtendedTaskCategory[]) => {
                if (current.find((currentCategory: ExtendedTaskCategory) => currentCategory.id === category.id)) {
                    return current.filter((currentCategory: ExtendedTaskCategory) => currentCategory.id !== category.id);
                } else {
                    return [...current, category]; 
                }
            });
        },
    }
}

export const taskCategoriesForm = createTaskCategoriesForm();
