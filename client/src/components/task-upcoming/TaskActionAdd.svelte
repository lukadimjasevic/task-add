<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import type { Task, TaskCreateDTO } from "taskadd/task";
    import type { TaskCategory } from "taskadd/task-category";
    import Modal from "@components/common/Modal.svelte";
    import { FormCard, FormFloating, FormInput, FormTextarea, FormSubmit } from "@components/common/forms";
    import CategoriesDropdown from "@components/task-category/CategoriesDropdown.svelte";
    import CategoriesList from "@components/task-category/CategoriesUnlink.svelte";

    export let defaultDate: Date = new Date(Date.now() + 60 * 1000);

    let showModal: boolean = false;

    let name: Task["name"];
    let description: Task["description"];
    let deadlineDate: string = helpers.date.getDateToString(defaultDate);
    let deadlineTime: string = helpers.date.getTimeToString(defaultDate);
    let deadline: Task["deadlineDate"];
    $: deadline = helpers.date.computeDeadlineDate(deadlineDate, deadlineTime);
    let categories: TaskCategory[] = [];

    const handleAdd = async() => {
        const dto: TaskCreateDTO = {
            name,
            description,
            deadlineDate: deadline,
        };
        const response = await api.task.create(dto);
        if (response.statusCode === 201) {
            categories.forEach(async(category: TaskCategory) => {
                await api.category.link(response.data.id, category.id);
            });
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                showModal = false;
                tasks.setValues(fetchedTasks.data);
                taskCategories.updateCount($tasks.tasks);
            }
        }
    }

    const updateCategories = (updatedCategories: TaskCategory[]) => categories = updatedCategories;

    const resetForm = () => {
        name = "";
        description = "";
        deadlineDate = helpers.date.getDateToString(defaultDate);
        deadlineTime = helpers.date.getTimeToString(defaultDate);
        categories = [];
    }
</script>

<button type="button" 
        class="btn btn-outline-tertiary w-100 text-start text-dark add-task"
        on:click={() => showModal = true}>
    <i class="bi bi-plus-lg"></i>
    <span>Add New Task</span>
</button>

<Modal bind:show={showModal} on:close={resetForm}>
    <span slot="title">Add Task</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formTaskAdd" on:submit={handleAdd} className="d-flex flex-column gap-2">
                <CategoriesList bind:categories={categories} {updateCategories}/>
                <FormFloating id="name">
                    <FormInput bind:value={name} placeholder="Name" required={true} min={4} max={64} />
                    <span slot="label">Name</span>
                </FormFloating>
                <FormFloating id="description">
                    <FormTextarea bind:value={description} placeholder="Description" />
                    <span slot="label">Description</span>
                </FormFloating>
                <div class="row g-0 gap-2">
                    <FormFloating id="deadlineDate" className="col">
                        <FormInput type="date" bind:value={deadlineDate} placeholder="Deadline Date" required={true} />
                        <span slot="label">Deadline Date</span>
                    </FormFloating>
                    <FormFloating id="deadlineTime" className="col">
                        <FormInput type="time" bind:value={deadlineTime} placeholder="Deadline Time" required={true} />
                        <span slot="label">Deadline Time</span>
                    </FormFloating>
                </div>
                <CategoriesDropdown bind:categoriesUsed={categories} {updateCategories}/>
            </FormCard>
        </div>
    </div>
    <div slot="footer">
        <FormSubmit form="formTaskAdd">Add</FormSubmit>
    </div>
</Modal>

<style>
    .add-task {
        height: 3rem;
    }
</style>
