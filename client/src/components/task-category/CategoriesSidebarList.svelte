<script lang="ts">
    import { taskCategories } from "@stores/task-category";
    import { taskCategory } from "@pages/pages";
    import SidebarSectionItem from "@components/common/sidebars/SidebarSectionItem.svelte";
</script>

<div class="task-categories">
    {#each $taskCategories.categories as category (category)}
        <SidebarSectionItem on:click={() => taskCategory.beforeNavigate({ params: category.id.toString() })}>
            <i slot="icon" class="bi bi-square-fill" style="color: {category.color};"></i>
            <span slot="label">{category.name}</span>
            <span slot="count">{category.count}</span>
        </SidebarSectionItem>
    {/each}
</div>

<style>
    .task-categories {
        overflow-y: auto;
        max-height: 15rem;
    }
</style>
