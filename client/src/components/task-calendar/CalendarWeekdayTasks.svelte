<script lang="ts">
    import type { Task } from "taskadd/task";
    import CalendarTask from "./CalendarTask.svelte";

    export let tasks: Task[];
</script>

<td>
    {#each tasks as task (task.id)}
        <CalendarTask {task} />
    {/each}
</td>
