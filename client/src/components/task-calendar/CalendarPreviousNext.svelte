<script lang="ts">
    import { calendar } from "@stores/task-calendar";
</script>

<div>
    <button type="button" class="btn btn-sm btn-secondary" on:click={() => calendar.toggleDate(-1)}>
        <i class="bi bi-chevron-left"></i>
    </button>
    <button type="button" class="btn btn-sm btn-secondary" on:click={() => calendar.toggleDate(1)}>
        <i class="bi bi-chevron-right"></i>
    </button>
</div>
