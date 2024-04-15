<script lang="ts">
    import type { Task } from "taskadd/task";
    import TaskActionEdit from "@components/task-upcoming/TaskActionEdit.svelte";

    export let task: Task;

    const gradientColors = (task: Task) => {
        return task.categories.map((category, index) =>
            `${category.color} ${index * (100 / task.categories.length)}% ${(index + 1) * (100 / task.categories.length)}%`
        ).join(", ");
    }

    let colors: string;
    $: colors = "linear-gradient(to right, " + gradientColors(task) + ")";

    let showEditModal: boolean = false;
</script>

<button type="button" 
    class="btn btn-sm btn-quaternary m-1 border-0"
    style="background: {colors}"
    on:click={() => showEditModal = true}>
    {task.name}
</button>

<TaskActionEdit bind:show={showEditModal} {task} />
