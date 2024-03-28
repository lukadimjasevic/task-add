<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, GroupDayTasks } from "taskadd/task";
    import CalendarTable from "@components/task-calendar/CalendarTable.svelte";
    import CalendarHourTasks from "@components/task-calendar/CalendarHourTasks.svelte";
    import CalendarWeekdayTasks from "@components/task-calendar/CalendarWeekdayTasks.svelte";
    
    const filterTasksByDate = (tasksAll: Task[], dayStart: Date): Task[] => {
        let dayEnd = new Date(dayStart.getTime());
        dayEnd.setHours(23, 59, 59, 999);
        console.log(dayStart, dayEnd);
        return tasksAll.filter((task: Task) => 
            task.deadlineDate.getTime() >= dayStart.getTime() &&
            task.deadlineDate.getTime() <= dayEnd.getTime()
        );
    }

    const groupTasksByDate = (tasksAll: Task[], dayStart: Date): GroupDayTasks => {
        const dayTasks = filterTasksByDate(tasksAll, dayStart);
        const grouped: GroupDayTasks = {};
        dayTasks.forEach((task: Task) => {
            const hour = task.deadlineDate.getHours().toString();
            if (!Object.keys(grouped).includes(hour)) {
                grouped[hour] = {
                    date: task.deadlineDate,
                    tasks: [],
                };
            }
            grouped[hour]["tasks"].push(task);
        });
        return grouped;
    }

    $: dayTasks = groupTasksByDate($tasks.tasks, $calendar.date);
</script>

<CalendarTable {dayTasks} view="day">
    <tr slot="thead">
        <th/>
        <th>{helpers.date.getDayToString($calendar.date)}</th>
    </tr>
    {#each Object.entries(dayTasks) as [hour, { date, tasks }] (hour)}
        <tr>
            <CalendarHourTasks {date} />
            <CalendarWeekdayTasks {tasks} />
        </tr>
    {/each}
</CalendarTable>
