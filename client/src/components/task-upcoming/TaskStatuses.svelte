<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskStatuses } from "@stores/task-status";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { DropdownItem } from "@components/common/dropdowns";
    import type { Task, TaskUpdateDTO } from "taskadd/task";
    import type { TaskStatus } from "taskadd/task-status";

    export let tasksFiltered: Task[];

    let statuses: TaskStatus[] = $taskStatuses.statuses;

    const capitalizeFirstLetter = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const handleStatusUpdate = (status: TaskStatus) => {
        tasksFiltered.forEach(async(task: Task) => {
            const dto: TaskUpdateDTO = { id: task.id, status: status.name };
            const response = await api.task.update(dto);
            helpers.response.handleResponse(response, "Task status update", async() => {
                const fetchedTasks = await api.task.getAll();
                tasks.setValues(fetchedTasks.data);
            });
        });
    }
</script>

{#each statuses as status}
    <DropdownItem on:click={() => handleStatusUpdate(status)}>
        {capitalizeFirstLetter(status.name)}
    </DropdownItem>
{/each}
