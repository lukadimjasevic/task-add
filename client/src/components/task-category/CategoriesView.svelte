<script lang="ts">
    import { helpers } from "@helpers";
    import type { TaskCategory } from "taskadd/task-category";

    export let categories: TaskCategory[];
</script>

<div class="d-flex gap-1">
    {#each categories as category (category)}
        <span class="badge d-flex justify-content-between align-items-center gap-2 px-2 py-1 rounded" 
            style="background-color: {category.color}; color: {helpers.color.getContrastColor(category.color)}" >
            {category.name}
        </span>
    {/each}
</div>
