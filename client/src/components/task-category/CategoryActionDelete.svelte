<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { taskCategory } from "@pages/pages";
    import type { ExtendedTaskCategory } from "taskadd/task-category";
    import Modal from "@components/common/Modal.svelte";

    export let category: ExtendedTaskCategory;
    export let show: boolean = false;

    const handleRemoveCategory = async() => {
        const response = await api.category.remove(category.id);
        helpers.response.handleResponse(response, "Task category delete", async() => {
            const fetchedTasks = await api.task.getAll();
            const fetchedCategories = await api.category.getAll();
            tasks.setValues(fetchedTasks.data);
            taskCategories.setValues(fetchedCategories.data, $tasks.tasks);
            show = false;
            await taskCategory.beforeNavigate({ params: $taskCategories.categories[0].id });
        });
    }
</script>

<Modal bind:show>
    <span slot="title">Delete category</span>
    <div slot="body" class="row text-start fw-normal">
        <div class="col-12">
            <span>Are you sure you want to delete <b>{category.name}</b> category?</span>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn btn-danger" on:click={handleRemoveCategory}>
            Delete
        </button>
    </div>
</Modal>
