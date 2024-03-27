<script lang="ts">
    import { calendar } from "@stores/task-calendar";
</script>

<div class="calendar-selector d-flex gap-1 p-1 rounded bg-secondary">
    <button
        type="button"
        class="btn btn-sm"
        class:btn-primary={$calendar.selector !== "day"}
        class:btn-quaternary={$calendar.selector === "day"}
        class:active={$calendar.selector === "day"}
        on:click={() => calendar.setValues("day")}>
        Day
    </button>
    <button
        type="button"
        class="btn btn-sm"
        class:btn-primary={$calendar.selector !== "week"}
        class:btn-quaternary={$calendar.selector === "week"}
        class:active={$calendar.selector === "week"}
        on:click={() => calendar.setValues("week")}>
        Week
    </button>
    <button
        type="button"
        class="btn btn-sm"
        class:btn-primary={$calendar.selector !== "month"}
        class:btn-quaternary={$calendar.selector === "month"}
        class:active={$calendar.selector === "month"}
        on:click={() => calendar.setValues("month")}>
        Month
    </button>
</div>

<style>
    .calendar-selector {
        width: min-content !important;
    }
</style>
