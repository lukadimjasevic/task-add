<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { taskCategory } from "@pages/pages";
    import type { ExtendedTaskCategory } from "taskadd/task-category";
    import Modal from "@components/common/Modal.svelte";

    export let category: ExtendedTaskCategory;
    export let show: boolean = false;

    const handleRemoveCategory = async() => {
        const response = await api.category.remove(category.id);
        if (response.statusCode === 200) {
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                tasks.setValues(fetchedTasks.data);
                const fetchedCategories = await api.category.getAll();
                if (fetchedCategories.statusCode === 200) {
                    taskCategories.setValues(fetchedCategories.data, $tasks.tasks);
                    show = false;
                    await taskCategory.beforeNavigate({ params: $taskCategories.categories[0].id });
                }
            }
        }
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
