<script lang="ts">
    import { tasks } from "@stores/task";
    import type { Task } from "taskadd/task";
    import { FormCheckbox } from "@components/common/forms";
    import Card from "@components/common/Card.svelte";
    import TaskListRow from "./TaskListRow.svelte";
    import TaskActions from "./TaskActions.svelte";
    import TaskActionAdd from "./TaskActionAdd.svelte";

    export let tasksFiltered: Task[];
    export let defaultDate: Date;
    export let useHeader: boolean = true;

    let checked: boolean = false;
</script>

<Card {useHeader}>
    <div slot="header" class="d-flex align-items-center justify-content-between task-list-header">
        <div>
            <h4 class="m-0"><slot name="title"/></h4>
        </div>
        <div>
            <TaskActions {tasksFiltered} />
        </div>
    </div>
    <div slot="body">
        <TaskActionAdd {defaultDate} />

        <div class="table-tasks">
            <table class="table table-hover">
                <thead>
                    <tr class="align-middle">
                        <th>
                            <FormCheckbox
                                bind:checked
                                on:change={() => tasks.toggleSelectedTasks(tasksFiltered, checked)}
                            />
                        </th>
                        <th>Name</th>
                        <th>Categories</th>
                        <th>Deadline Date</th>
                        <th>Status</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {#each tasksFiltered as task (task.id)}
                        <TaskListRow {task} bind:checkedAll={checked} />
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</Card>

<style>
    .task-list-header {
        min-height: 2.5rem;
    }

    .table-tasks{
        overflow-y: auto;
        max-height: 30rem;
    }
    .table-tasks thead th {
        position: sticky;
        top: 0;
    }
</style>
