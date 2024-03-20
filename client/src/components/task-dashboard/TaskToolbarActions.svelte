<script lang="ts">
    import { tasks } from "../../stores/task";
    import { api } from "../../api";
    import type { Task } from "taskadd/task";
    import ButtonDelete from "../common/buttons/ButtonDelete.svelte";

    const handleDeleteAction = () => {
        $tasks.tasks.forEach(async(task: Task) => {
            if (!task.selected) return;

            const response = await api.task.remove(task.id);
            if (response.statusCode === 200) {
                const fetchedTasks = await api.task.getAll();
                if (fetchedTasks.statusCode === 200) {
                    tasks.setValues(fetchedTasks.data);
                }
            }
        });
    }
</script>

<div class="d-flex align-items-center gap-3">
    {#if $tasks.tasksSelected.count > 0}
        <ButtonDelete on:click={handleDeleteAction} />
        <span>{$tasks.tasksSelected.count} selected</span>
    {/if}
</div>
