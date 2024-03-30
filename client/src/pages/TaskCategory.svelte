<script lang="ts">
    import { taskCategories } from "@stores/task-category";
    import type { TaskCategoriesFrame, ExtendedTaskCategory } from "taskadd/task-category";

    const findSelectedCategory = (taskCategories: TaskCategoriesFrame): ExtendedTaskCategory | undefined => {
        return taskCategories.categories.find((category: ExtendedTaskCategory) => category.id === taskCategories.categorySelected);
    }

    $: category = findSelectedCategory($taskCategories);
</script>

{#if category}
    <h2>{category.name}</h2>
{:else}
    <h2>No category found</h2>
{/if}
