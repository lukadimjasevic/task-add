<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, GroupWeekTasks, TaskDays } from "taskadd/task";
    import CalendarTable from "@components/task-calendar/CalendarTable.svelte";
    import CalendarHourTasks from "@components/task-calendar/CalendarHourTasks.svelte";
    import CalendarWeekdayTasks from "@components/task-calendar/CalendarWeekdayTasks.svelte";

    const filterTasksByWeek = (tasksAll: Task[], weekStart: Date): Task[] => {
        let weekEnd = new Date(weekStart.getTime());
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        return tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= weekStart.getTime() &&
            task.deadlineDate.getTime() <= weekEnd.getTime()
        );
    }

    const groupTasksByWeekday = (tasksAll: Task[], weekStart: Date): GroupWeekTasks => {
        const weekTasks = filterTasksByWeek(tasksAll, weekStart);
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
    <tr slot="thead">
        <th/>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        <th>Sunday</th>
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
