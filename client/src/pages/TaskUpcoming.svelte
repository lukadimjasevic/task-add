<script lang="ts">
    import { tasks } from "../stores/task";
    import { onMount } from "svelte";
    import type { Task } from "taskadd/task";
    import TaskList from "../components/task-upcoming/TaskList.svelte";

    const computeTasksToday = (tasksAll: Task[]): Task[] => {
        const todayStart = new Date();
        const todayEnd = new Date();
        todayStart.setHours(0, 0, 0, 0);
        todayEnd.setHours(23, 59, 59, 999);
        const tasksToday = tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= todayStart.getTime() &&
            task.deadlineDate.getTime() < todayEnd.getTime()
        );
        tasks.setCountToday(tasksToday.length);
        return tasksToday;
    }

    const computeTasksTomorrow = (tasksAll: Task[]): Task[] => {
        const tomorrowStart = new Date();
        const tomorrowEnd = new Date();
        tomorrowStart.setHours(24, 0, 0, 0);
        tomorrowEnd.setHours(47, 59, 59, 999);
        const tasksTomorrow = tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= tomorrowStart.getTime() &&
            task.deadlineDate.getTime() < tomorrowEnd.getTime()
        );
        tasks.setCountTomorrow(tasksTomorrow.length);
        return tasksTomorrow;
    }

    const computeTasksWeek = (tasksAll: Task[]): Task[] => {
        const weekStart = new Date();
        const weekEnd = new Date();
        weekStart.setHours(48, 0, 0, 0);
        weekEnd.setHours(167, 59, 59, 999);
        const tasksWeek = tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= weekStart.getTime() &&
            task.deadlineDate.getTime() < weekEnd.getTime()
        );
        tasks.setCountWeek(tasksWeek.length);
        return tasksWeek;
    }

    const computeTasksFuture = (tasksAll: Task[]): Task[] => {
        const futureStart = new Date();
        futureStart.setHours(168, 0, 0, 0);
        const tasksFuture = tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= futureStart.getTime()
        );
        tasks.setCountFuture(tasksFuture.length);
        return tasksFuture;
    }

    $: tasksToday = computeTasksToday($tasks.tasks);
    $: tasksTomorrow = computeTasksTomorrow($tasks.tasks);
    $: tasksWeek = computeTasksWeek($tasks.tasks);
    $: tasksFuture = computeTasksFuture($tasks.tasks);
</script>

<h2>Upcoming <span class="badge bg-secondary text-dark">{$tasks.countActive}</span></h2>
<div class="d-flex flex-column gap-3">
    <TaskList tasksFiltered={tasksToday}>
        <span slot="title">Today 
            <span class="badge bg-secondary text-dark">
                {$tasks.countToday}
            </span>
        </span>
    </TaskList>
    <div class="row g-0 gap-3 ">
        <div class="col">
            <TaskList tasksFiltered={tasksTomorrow}>
                <span slot="title">Tomorrow
                    <span class="badge bg-secondary text-dark">
                        {$tasks.countTomorrow}
                    </span>
                </span>
            </TaskList>
        </div>
        <div class="col">
            <TaskList tasksFiltered={tasksWeek}>
                <span slot="title">This Week
                    <span class="badge bg-secondary text-dark">
                        {$tasks.countWeek}
                    </span>
                </span>
            </TaskList>
        </div>
    </div>
    <TaskList tasksFiltered={tasksFuture}>
        <span slot="title">In Future
            <span class="badge bg-secondary text-dark">
                {$tasks.countFuture}
            </span>
        </span>
    </TaskList>
</div>
