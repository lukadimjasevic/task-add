<script lang="ts">
    import { tasks } from "@stores/task";
    import { helpers } from "@helpers";
    import TaskList from "@components/task-upcoming/TaskList.svelte";

    $: tasksToday = tasks.computeTasksToday($tasks.tasks);
    $: tasksTomorrow = tasks.computeTasksTomorrow($tasks.tasks);
    $: tasksWeek = tasks.computeTasksWeek($tasks.tasks);
    $: tasksFuture = tasks.computeTasksFuture($tasks.tasks);

    const dayTime = 24 * 3600 * 1000;
    const defaultDateToday: Date = helpers.date.getDefaultDate();
    const defaultDateTomorrow: Date = helpers.date.getDefaultDate(new Date(Date.now() + dayTime));
    const defaultDateWeek: Date = helpers.date.getDefaultDate(new Date(Date.now() + 2 * dayTime));
    const defaultDateFuture: Date = helpers.date.getDefaultDate(new Date(Date.now() + 7 * dayTime));
</script>

<h2>Upcoming <span class="badge bg-secondary text-dark">{$tasks.countUpcoming}</span></h2>
<div class="d-flex flex-column gap-3">
    <TaskList tasksFiltered={tasksToday} defaultDate={defaultDateToday}>
        <span slot="title">Today 
            <span class="badge bg-secondary text-dark">
                {$tasks.countToday}
            </span>
        </span>
    </TaskList>
    <div class="row g-0 gap-3">
        <div class="col">
            <TaskList tasksFiltered={tasksTomorrow} defaultDate={defaultDateTomorrow}>
                <span slot="title">Tomorrow
                    <span class="badge bg-secondary text-dark">
                        {$tasks.countTomorrow}
                    </span>
                </span>
            </TaskList>
        </div>
        <div class="col">
            <TaskList tasksFiltered={tasksWeek} defaultDate={defaultDateWeek}>
                <span slot="title">This Week
                    <span class="badge bg-secondary text-dark">
                        {$tasks.countWeek}
                    </span>
                </span>
            </TaskList>
        </div>
    </div>
    <TaskList tasksFiltered={tasksFuture} defaultDate={defaultDateFuture}>
        <span slot="title">In Future
            <span class="badge bg-secondary text-dark">
                {$tasks.countFuture}
            </span>
        </span>
    </TaskList>
</div>
