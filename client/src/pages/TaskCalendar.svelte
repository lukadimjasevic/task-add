<script lang="ts">
    import { calendar } from "@stores/task-calendar";
    import CalendarSelector from "@components/task-calendar/CalendarSelector.svelte";
    import CalendarPreviousNext from "@components/task-calendar/CalendarPreviousNext.svelte";
    import CalendarDay from "@components/task-calendar/day/CalendarDay.svelte";
    import CalendarWeek from "@components/task-calendar/week/CalendarWeek.svelte";
    import CalendarMonth from "@components/task-calendar/month/CalendarMonth.svelte";
    import TaskActionAdd from "@components/task-upcoming/TaskActionAdd.svelte";
</script>

<div class="d-flex justify-content-between align-items-center">
    <div>
        <h2>{$calendar.label}</h2>
    </div>
    <div>
        <TaskActionAdd/>
    </div>
</div>
<div class="d-flex justify-content-between align-items-center">
    <CalendarSelector/>
    <CalendarPreviousNext/>
</div>

{#if $calendar.selector === "day"}
    <CalendarDay/>
{/if}
{#if $calendar.selector === "week"}
    <CalendarWeek/>
{/if}
{#if $calendar.selector === "month"}
    <CalendarMonth/>
{/if}
