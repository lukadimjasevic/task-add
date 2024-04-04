<script lang="ts">
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import type { Task } from "taskadd/task";
    import type { TaskCategory } from "taskadd/task-category";
    import { FormCard, FormFloating, FormInput, FormTextarea, FormSubmit } from "@components/common/forms";
    import Modal from "@components/common/Modal.svelte";
    import CategoriesDropdown from "@components/task-category/CategoriesDropdown.svelte";
    import CategoriesList from "@components/task-category/CategoriesUnlink.svelte";
  
    export let task: Task;
    export let show: boolean = false;

    let name: string = task.name;
    let description: string = task.description;
    let deadlineDate: string = helpers.date.getDateToString(task.deadlineDate);
    let deadlineTime: string = helpers.date.getTimeToString(task.deadlineDate);
    $: deadline =  helpers.date.computeDeadlineDate(deadlineDate, deadlineTime);
    let categories: TaskCategory[] = task.categories;
    $: categoriesToAdd = filterCategoriesToAdd(categories);
    $: categoriesToRemove = filterCategoriesToRemove(categories);

    const filterCategoriesToAdd = (categories: TaskCategory[]): TaskCategory[] => {
        const categoriesToAdd: TaskCategory[] = [];
        for (const category of categories) {
            let toAdd: boolean = true;
            for (const storedCategory of task.categories) {
                if (storedCategory.id === category.id) {
                    toAdd = false;
                    break;
                }
            }
            if (toAdd) categoriesToAdd.push(category);
        }
        return categoriesToAdd;
    }

    const filterCategoriesToRemove = (categories: TaskCategory[]): TaskCategory[] => {
        const categoriesToRemove: TaskCategory[] = [];
        for (const storedCategory of task.categories) {
            let toRemove: boolean = true;
            for (const category of categories) {
                if (category.id === storedCategory.id) {
                    toRemove = false;
                }
            }
            if (toRemove) categoriesToRemove.push(storedCategory);
        }
        return categoriesToRemove;
    }

    const handleEdit = async() => {
        const response = await api.task.update(task.id, name, description, deadline);
        if (response.statusCode === 200) {
            categoriesToAdd.forEach(async(categoryToAdd: TaskCategory) => {
                await api.category.link(task.id, categoryToAdd.id);
            });
            categoriesToRemove.forEach(async(categoryToRemove: TaskCategory) => {
                await api.category.unlink(task.id, categoryToRemove.id);
            });
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                show = false;
                tasks.setValues(fetchedTasks.data);
                taskCategories.updateCount($tasks.tasks);
            }
        }
    }

    const updateCategories = (updatedCategories: TaskCategory[]) => categories = updatedCategories;
</script>

<Modal bind:show>
    <span slot="title">Edit Task - {task.name}</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formTaskEdit" on:submit={handleEdit} className="d-flex flex-column gap-2">
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
        <FormSubmit form="formTaskEdit">Save</FormSubmit>
    </div>
</Modal>
