<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import type { Task, TaskDeleteDTO } from "taskadd/task";
    import Modal from "@components/common/Modal.svelte";

    const findSelectedTasks = (tasks: Task[]): Task[] => {
        const tasksToDelete: Task[] = [];
        tasks.forEach((task: Task) => {
            if (task.selected) tasksToDelete.push(task);
        });
        return tasksToDelete;
    }

    export let show: boolean = false;
    $: tasksToDelete = findSelectedTasks($tasks.tasks);

    const handleDeleteAction = () => {
        tasksToDelete.forEach(async(task: Task) => {
            const dto: TaskDeleteDTO = { id: task.id };
            const response = await api.task.remove(dto);
            helpers.response.handleResponse(response, "Task delete", async() => {
                const fetchedTasks = await api.task.getAll();
                tasks.setValues(fetchedTasks.data);
                taskCategories.updateCount($tasks.tasks);
                show = false;
            });
        });
    }
</script>

<Modal bind:show>
    <span slot="title">
        {#if tasksToDelete.length === 1}
            Delete task
        {:else}
            Delete tasks
        {/if}
    </span>
    <div slot="body" class="row text-start fw-normal">
        <div class="col-12">
            <span>Are you sure you want to delete selected</span>
            {#if tasksToDelete.length === 1}
                task?
            {:else}
                tasks?
            {/if}
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn btn-danger" on:click={handleDeleteAction}>
            Delete
        </button>
    </div>
</Modal>
