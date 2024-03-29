<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, GroupWeekTasks, TaskDays } from "taskadd/task";
    import CalendarTable from "@components/task-calendar/CalendarTable.svelte";
    import CalendarHourTasks from "@components/task-calendar/CalendarHourTasks.svelte";
    import CalendarWeekdayTasks from "@components/task-calendar/CalendarWeekdayTasks.svelte";

    const groupTasksByWeekday = (tasksAll: Task[], weekStart: Date): GroupWeekTasks => {
        const weekTasks = helpers.task.filterTasksByWeek(tasksAll, weekStart);
        // Sort week tasks by hours
        weekTasks.sort((a: Task, b: Task) => a.deadlineDate.getHours() - b.deadlineDate.getHours());
        const grouped: GroupWeekTasks = {};
        weekTasks.forEach((task: Task) => {
            const hour = task.deadlineDate.getHours().toString();
            if (!Object.keys(grouped).includes(hour)) {
                grouped[hour] = {
                    date: task.deadlineDate,
                    days: {
                        mon: [],
                        tue: [],
                        wed: [],
                        thu: [],
                        fri: [],
                        sat: [],
                        sun: [],
                    }
                };
            }
            const weekday = helpers.date.getShortWeekday(task.deadlineDate);
            grouped[hour]["days"][weekday as keyof TaskDays].push(task);
        });
        return grouped;
    }

    $: weekTasks = groupTasksByWeekday($tasks.tasks, $calendar.date);
</script>

<CalendarTable {weekTasks} view="week">
    <tr slot="thead" class="text-uppercase">
        <th/>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
    </tr>
    {#each Object.entries(weekTasks) as [hour, { date, days }] (hour)}
        <tr>
            <CalendarHourTasks {date} />
            {#each Object.entries(days) as [weekday, tasks] (weekday)}
                <CalendarWeekdayTasks {tasks} />
            {/each}
        </tr>
    {/each}
</CalendarTable>
