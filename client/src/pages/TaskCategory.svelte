<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { helpers } from "@helpers";
    import type { ExtendedTaskCategory, TaskCategory } from "taskadd/task-category";
    import TaskList from "@components/task-upcoming/TaskList.svelte";
    import CategoryActions from "@components/task-category/CategoryActions.svelte";

    export let categoryId: string;

    const findSelectedCategory = (categoryId: number, categories: ExtendedTaskCategory[]): ExtendedTaskCategory | false => {
        return categories.find((category: ExtendedTaskCategory) => category.id === categoryId) || false;
    } 

    let category: ExtendedTaskCategory | false;
    $: category = findSelectedCategory(parseInt(categoryId), $taskCategories.categories);
    $: categoryTasks = helpers.task.filterTasksByCategory($tasks.tasks, category as TaskCategory);

    const defaultDateToday = helpers.date.getDefaultDate();
</script>

{#if category}
    <div class="d-flex justify-content-between">
        <div>
            <h2>
                {category.name} 
                <span class="badge bg-secondary text-dark">
                    {category.count}
                </span>
            </h2>
        </div>
        <div>
            <CategoryActions {category} {categoryId}/>
        </div>
    </div>
    <div class="d-flex flex-column gap-3">
        <TaskList tasksFiltered={categoryTasks} defaultDate={defaultDateToday}/>
    </div>
{:else}
    <h2>No category found</h2>
{/if}
