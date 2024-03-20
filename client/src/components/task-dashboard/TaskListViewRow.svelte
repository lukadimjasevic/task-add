<script lang="ts">
    import { tasks } from "../../stores/task";
    import type { Task } from "taskadd/task";
    import FormCheckbox from "../common/forms/FormCheckbox.svelte";

    export let task: Task;
    
    $: checked = task.selected;
</script>

<tr class="align-middle">
    <td>
        <FormCheckbox 
            bind:checked 
            on:change={() => tasks.toggleSelected(task.id)}
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
        <span>{task.description}</span>
    </td>
    <td>
        <span>{task.deadlineDate.toLocaleString()}</span>
    </td>
    <td>
        <span>{task.createDate.toLocaleString()}</span>
    </td>
    <td>
        <span>{task.status.name}</span>
    </td>
</tr>
