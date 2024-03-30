<script lang="ts">
    import { taskCategoriesForm } from "@stores/task-category-form";
    import { helpers } from "@helpers";
    import type { ExtendedTaskCategory } from "taskadd/task-category";

    const onclickRemoveCategory = (category: ExtendedTaskCategory) => {
        taskCategoriesForm.toggleCategory(category);
    }
</script>

<div class="d-flex gap-1">
    {#each $taskCategoriesForm as category (category)}
        <div class="d-flex justify-content-between align-items-center gap-2 ps-2 rounded" 
            style="background-color: {category.color}; color: {helpers.color.getContrastColor(category.color)}" >
            <span><b>{category.name}</b></span>
            <button type="button" class="btn btn-sm" on:click={() => onclickRemoveCategory(category)}>
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    {/each}
</div>
