<script lang="ts">
    import { tasks } from "@stores/task";
    import type { Task } from "taskadd/task";
    import { FormCheckbox } from "@components/common/forms";
    import TaskActionEdit from "./TaskActionEdit.svelte";
    
    export let task: Task;
    export let checkedAll: boolean;

    let showEditModal: boolean = false;
    $: checked = task.selected;

    const handleOnChange = () => {
        if (checked) checkedAll = false;
        tasks.toggleSelectedTask(task);
    }
</script>

<tr class="align-middle" class:table-active={checked}>
    <td>
        <FormCheckbox 
            bind:checked 
            on:change={handleOnChange}
        />
    </td>
    <td>
        <span>{task.name}</span>
    </td>
    <td>
        {#each task.categories as category}
            <span>{category.name}</span>
        {/each}
    </td>
    <td>
        <i class="bi bi-calendar-x pe-2 h5"></i>
        <span>{task.deadlineDate.toLocaleDateString()}</span>
    </td>
    <td>
        <span class="badge text-bg-success">{task.status.name}</span>
    </td>
    <td class="text-end">
        <button type="button" 
                class="btn btn-outline-tertiary text-dark" 
                on:click={() => showEditModal = true}>
            <i class="bi bi-chevron-right h5"></i>
        </button>
        <TaskActionEdit bind:show={showEditModal} {task} />
    </td>
</tr>
