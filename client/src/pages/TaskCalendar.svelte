<script lang="ts">
    import { calendar } from "@stores/task-calendar";
    import CalendarSelector from "@components/task-calendar/CalendarSelector.svelte";
    import CalendarPreviousNext from "@components/task-calendar/CalendarPreviousNext.svelte";
</script>

<h2>{$calendar.label}</h2>
<div class="d-flex justify-content-between align-items-center">
    <CalendarSelector/>
    <CalendarPreviousNext/>
</div>
