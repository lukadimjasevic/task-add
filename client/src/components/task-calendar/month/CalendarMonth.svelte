<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, MonthView } from "taskadd/task";
    import CalendarTable from "@components/task-calendar/CalendarTable.svelte";
    import CalendarWeekdayTasks from "@components/task-calendar/CalendarWeekdayTasks.svelte";

    const createMonthView = (taskAll: Task[], monthStartDate: Date) => {
        const monthStart = new Date(monthStartDate);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthStart.getMonth() + 1);
        monthEnd.setDate(monthStart.getDate() - 1);
        monthEnd.setHours(23, 59, 59, 999);
        const monthView: MonthView[] = [];
        let monthWeek: MonthView = { mon: null, tue: null, wed: null, thu: null, fri: null, sat: null, sun: null };
        for (let date = 0; date < monthEnd.getDate(); date++) {
            const currentDay = new Date(monthStart);
            currentDay.setDate(currentDay.getDate() + date);
            const weekday = helpers.date.getShortWeekday(currentDay);
            monthWeek[weekday as keyof MonthView] = {
                date: currentDay,
                tasks: helpers.task.filterTasksByDate(taskAll, currentDay),
            }
            if (weekday === "sun" || date === monthEnd.getDate() - 1) {
                monthView.push(monthWeek);
                monthWeek = { mon: null, tue: null, wed: null, thu: null, fri: null, sat: null, sun: null };
            }
        }
        return monthView;
    }

    $: monthView = createMonthView($tasks.tasks, $calendar.date);
</script>

<CalendarTable view="month">
    <tr slot="thead" class="text-uppercase">
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
    </tr>
    {#each monthView as monthWeek (monthWeek)}
        <tr>
            {#each Object.entries(monthWeek) as [index, day]}
                {#if !day}
                    <td/>
                {:else}
                    <CalendarWeekdayTasks tasks={day.tasks}>
                        <span slot="date">{day.date.getDate()}</span>
                    </CalendarWeekdayTasks>
                {/if}
            {/each}
        </tr>
    {/each}
</CalendarTable>
