<script lang="ts">
    import type { GroupDayTasks, GroupWeekTasks } from "taskadd/task";

    export let dayTasks: GroupDayTasks = {};
    export let weekTasks: GroupWeekTasks = {};
    export let view: "day" | "week" | "month";
</script>

<div class="calendar-table">
    <table class="table table-hover" class:table-fixed={view !== "day"}>
        <thead>
            <slot name="thead"/>
        </thead>
        <tbody>
            <slot/>
        </tbody>
        {#if view === "day"}
            {#if !Object.keys(dayTasks).length}
                <tfoot>
                    <tr>
                        <td class="td-hour"/>
                        <td>No tasks found for the selected date</td>
                    </tr>
                </tfoot>
            {/if}
        {/if}
        {#if view === "week"}
            {#if !Object.keys(weekTasks).length}
                <tfoot>
                    <tr>
                        <td colspan="8" class="text-center">No tasks found for the selected date</td>
                    </tr>
                </tfoot>
            {/if}
        {/if}
    </table>
</div>

<style>
    .calendar-table {
        overflow-x: auto;
    }

    .table-fixed {
        table-layout: fixed;
        min-width: 30rem;
    }

    .td-hour {
        width: 7rem;
    }
</style>
