<script lang="ts">
    import TaskToolbarActions from "./TaskToolbarActions.svelte";
</script>

<div class="d-flex align-items-center justify-content-between">
    <div>
        <button type="button" class="btn btn-light">
            <i class="bi bi-list-ul"></i> List
        </button>
        <button type="button" class="btn btn-light">
            <i class="bi bi-kanban"></i> Kanban
        </button>
    </div>
    
    <TaskToolbarActions />
</div>
