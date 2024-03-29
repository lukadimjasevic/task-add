<script lang="ts">
    import type { Task } from "taskadd/task";
    import TaskActionEdit from "@components/task-upcoming/TaskActionEdit.svelte";

    export let task: Task;

    let showEditModal: boolean = false;
</script>

<button type="button" class="btn btn-sm btn-quaternary m-1" on:click={() => showEditModal = true}>
    {task.name}
</button>

<TaskActionEdit bind:show={showEditModal} {task} />
