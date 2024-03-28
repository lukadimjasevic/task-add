<script lang="ts">
    import { tasks } from "@stores/task";
    import { calendar } from "@stores/task-calendar";
    import { helpers } from "@helpers";
    import type { Task, GroupTasks } from "taskadd/task";
    import CalendarTask from "./CalendarTask.svelte";
    
    const filterTasksByDate = (tasksAll: Task[], date: Date): Task[] => {
        return tasksAll.filter((task: Task) => task.deadlineDate.getDate() === date.getDate());;
    }

    const groupTasksByDate = (tasksAll: Task[], date: Date): GroupTasks => {
        const tasksFiltered = filterTasksByDate(tasksAll, date);
        const grouped: GroupTasks = {};
        tasksFiltered.forEach((task: Task) => {
            const hour = task.deadlineDate.getHours().toString();
            if (!Object.keys(grouped).includes(hour)) {
                grouped[hour] = [];
            }
            grouped[hour].push(task);
        });
        return grouped;
    }

    $: tasksGrouped = groupTasksByDate($tasks.tasks, $calendar.date);
</script>

<div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th/>
                <th>{helpers.date.getDayToString($calendar.date)}</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.keys(tasksGrouped) as hour (hour)}
                <tr>
                    <td class="td-hour text-end">{helpers.date.getHourToString(tasksGrouped[hour][0].deadlineDate)}</td>
                    <td>
                        {#each tasksGrouped[hour] as task (task.id)}
                            <CalendarTask {task}/>
                        {/each}
                    </td>
                </tr>
            {/each}
            {#if !Object.keys(tasksGrouped).length}
                <tr>
                    <td class="td-hour"/>
                    <td>No tasks found for the selected date</td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style>
    .td-hour {
        width: 7rem;
    }
</style>
