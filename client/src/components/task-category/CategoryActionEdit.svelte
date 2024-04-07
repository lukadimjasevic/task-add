<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import type { ExtendedTaskCategory } from "taskadd/task-category";
    import { api } from "@api";
    import { FormCard, FormFloating, FormInput, FormSubmit } from "@components/common/forms";
    import Modal from "@components/common/Modal.svelte";

    export let category: ExtendedTaskCategory;
    export let show: boolean;

    let name: string = category.name;
    let color: string = category.color;

    const handleEditCategory = async() => {
        const response = await api.category.update(category.id, name, color);
        if (response.statusCode === 200) {
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                tasks.setValues(fetchedTasks.data);
                const fetchedCategories = await api.category.getAll();
                if (fetchedCategories.statusCode === 200) {
                    taskCategories.setValues(fetchedCategories.data, $tasks.tasks);
                    show = false;
                }
            }
        }
    }

    const resetForm = () => {
        name = category.name;
        color = category.color;
    }
</script>

<Modal bind:show on:close={resetForm}>
    <span slot="title">Edit Category - {category.name}</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formCategoryEdit" on:submit={handleEditCategory} className="d-flex flex-column gap-2">
                <FormFloating id="taskName">
                    <FormInput bind:value={name} placeholder="Name" required={true} min={1} max={64} />
                    <span slot="label">Name</span>
                </FormFloating>
                <FormFloating id="taskDeadlineDate">
                    <FormInput type="color" bind:value={color} className="form-control-color w-100 mt-1" placeholder="Color" required={true} />
                    <span slot="label">Color</span>
                </FormFloating>
            </FormCard>
        </div>
    </div>
    <div slot="footer">
        <FormSubmit form="formCategoryEdit">Save</FormSubmit>
    </div>
</Modal>
