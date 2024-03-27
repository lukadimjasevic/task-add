<script lang="ts">
    import { calendar } from "@stores/task-calendar";
    import CalendarSelector from "@components/task-calendar/CalendarSelector.svelte";
    import CalendarPreviousNext from "@components/task-calendar/CalendarPreviousNext.svelte";
</script>

{#if $calendar.selector === "day"}
    <h2>{$calendar.labelDay}</h2>
{/if}
{#if $calendar.selector === "week"}
    <h2>{$calendar.labelWeek}</h2>
{/if}
{#if $calendar.selector === "month"}
    <h2>{$calendar.labelMonth}</h2>
{/if}
<div class="d-flex justify-content-between align-items-center">
    <CalendarSelector/>
    <CalendarPreviousNext/>
</div>
