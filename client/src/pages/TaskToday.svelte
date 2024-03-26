<script lang="ts">
    import { tasks } from "@stores/task";
    import TaskList from "@components/task-upcoming/TaskList.svelte";

    $: tasksToday = tasks.computeTasksToday($tasks.tasks);

    const getDefaultDate = (date: Date) => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    const defaultDateToday = getDefaultDate(new Date());
</script>

<h2>Today <span class="badge bg-secondary text-dark">{$tasks.countToday}</span></h2>
<div class="d-flex flex-column gap-3">
    <TaskList useHeader={false} tasksFiltered={tasksToday} defaultDate={defaultDateToday} />
</div>
