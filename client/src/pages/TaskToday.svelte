<script lang="ts">
    import { tasks } from "@stores/task";
    import { helpers } from "@helpers";
    import TaskList from "@components/task-upcoming/TaskList.svelte";

    $: tasksToday = tasks.computeTasksToday($tasks.tasks);
    const defaultDateToday = helpers.date.getDefaultDate();
</script>

<h2>Today <span class="badge bg-secondary text-dark">{$tasks.countToday}</span></h2>
<div class="d-flex flex-column gap-3">
    <TaskList tasksFiltered={tasksToday} defaultDate={defaultDateToday}/>
</div>
