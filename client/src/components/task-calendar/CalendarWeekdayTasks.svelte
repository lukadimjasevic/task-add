<script lang="ts">
    import type { Task } from "taskadd/task";
    import CalendarTask from "./CalendarTask.svelte";

    export let tasks: Task[];
</script>

<td>
    <div class="d-flex flex-column weekday-tasks">
        <div class="m-1">
            <slot name="date"/>
        </div>
        <div>
            {#each tasks as task (task.id)}
                <CalendarTask {task} />
            {/each}
        </div>
    </div>
</td>

<style>
    .weekday-tasks {
        height: 8rem;
        overflow-y: auto;
    }
</style>
