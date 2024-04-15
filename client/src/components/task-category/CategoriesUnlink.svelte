<script lang="ts">
    import { helpers } from "@helpers";
    import type { TaskCategory } from "taskadd/task-category";

    export let categories: TaskCategory[] = [];
    export let updateCategories: (categories: TaskCategory[]) => void;

    const onclickRemoveCategory = (category: TaskCategory) => {
        const updatedCategories = categories.filter((storedCategory: TaskCategory) => storedCategory.id !== category.id);
        updateCategories(updatedCategories);
    }
</script>

<div class="d-flex gap-1">
    {#each categories as category (category)}
        <div class="d-flex justify-content-between align-items-center gap-2 ps-2 rounded" 
            style="background-color: {category.color}; color: {helpers.color.getContrastColor(category.color)}" >
            <span><b>{category.name}</b></span>
            <button type="button" class="btn btn-sm" on:click={() => onclickRemoveCategory(category)}>
                <i class="bi bi-x-lg" style="color: {helpers.color.getContrastColor(category.color)}"></i>
            </button>
        </div>
    {/each}
</div>
