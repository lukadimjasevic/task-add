<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, GroupDayTasks } from "taskadd/task";
    import CalendarTable from "@components/task-calendar/CalendarTable.svelte";
    import CalendarHourTasks from "@components/task-calendar/CalendarHourTasks.svelte";
    import CalendarWeekdayTasks from "@components/task-calendar/CalendarWeekdayTasks.svelte";

    const groupTasksByDate = (tasksAll: Task[], dayStart: Date): GroupDayTasks => {
        const dayTasks = helpers.task.filterTasksByDate(tasksAll, dayStart);
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
    <tr slot="thead" class="text-uppercase">
        <th/>
        <th>{helpers.date.getShortWeekday($calendar.date)}</th>
    </tr>
    {#each Object.entries(dayTasks) as [hour, { date, tasks }] (hour)}
        <tr>
            <CalendarHourTasks {date} />
            <CalendarWeekdayTasks {tasks} />
        </tr>
    {/each}
</CalendarTable>
