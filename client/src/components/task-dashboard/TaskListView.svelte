<script lang="ts">
    import { tasks } from "../../stores/task";
    import FormCheckbox from "../common/forms/FormCheckbox.svelte";
    import TaskListViewRow from "./TaskListViewRow.svelte";

    $: checked = $tasks.tasksSelected.selected;
</script>

<table class="table table-hover">
    <thead>
        <tr>
            <th>
                <FormCheckbox 
                    bind:checked
                    on:change={() => tasks.toggleAllSelected()}
                />
            </th>
            <th>Name</th>
            <th>Categories</th>
            <th>Description</th>
            <th>Deadline Date</th>
            <th>Create Date</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        {#each $tasks.tasks as task (task.id)}
            <TaskListViewRow {task} />
        {/each}
    </tbody>
</table>
