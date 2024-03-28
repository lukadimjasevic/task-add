<script lang="ts">
    import type { Task } from "taskadd/task";

    export let task: Task;
</script>

<button type="button" class="btn btn-sm btn-quaternary m-1">
    {task.name}
</button>
