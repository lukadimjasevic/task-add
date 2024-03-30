import { writable } from "svelte/store";
import type { TaskCategoryStore } from "taskadd/store";
import type { TaskCategoriesFrame, ExtendedTaskCategory } from "taskadd/task-category";
import type { Task } from "taskadd/task";

const defaultValues: TaskCategoriesFrame = {
    categories: [],
    categorySelected: -1,
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
            update((current: TaskCategoriesFrame) => current = {
                categories: dataCategories,
                categorySelected:
                    current.categorySelected !== -1
                        ? current.categorySelected
                        : dataCategories[0]
                            ? dataCategories[0].id
                            : -1,
            });
        },
        setCategorySelected: (categoryId: number) => {
            update((current: TaskCategoriesFrame) => current = {
                ...current,
                categorySelected: categoryId,
            });
        },
        reset: () => set(defaultValues),
    }
}

export const taskCategories = createTaskCategories();
