<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import Modal from "@components/common/Modal.svelte";
    import { FormCard, FormFloating, FormInput, FormSubmit } from "@components/common/forms";

    let showModal: boolean = false;

    let name: string;
    let color: string = "#99c1f1";

    const handleAdd = async() => {
        const response = await api.category.create(name, color);
        helpers.response.handleResponse(response, "Task category add", async() => {
            const fetchedCategories = await api.category.getAll();
            taskCategories.setValues(fetchedCategories.data, $tasks.tasks);
            showModal = false;
        });
    }

    const resetForm = () => {
        name = "";
        color = "#99c1f1";
    }
</script>

<button type="button" 
        class="btn btn-outline-tertiary w-100 text-start text-dark add-category"
        on:click={() => showModal = true}>
    <i class="bi bi-plus-lg"></i>
    <span>Add New Category</span>
</button>

<Modal bind:show={showModal} on:close={resetForm}>
    <span slot="title">Add Category</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formCategoryAdd" on:submit={handleAdd} className="d-flex flex-column gap-2">
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
        <FormSubmit form="formCategoryAdd">Add</FormSubmit>
    </div>
</Modal>

<style>
    .add-category {
        height: 3rem;
    }
</style>
