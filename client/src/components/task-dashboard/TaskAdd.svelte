<script lang="ts">
    import { tasks } from "../../stores/task";
    import { api } from "../../api";
    import Modal from "../common/Modal.svelte";
    import { FormCard, FormFloating, FormInput, FormTextarea, FormSubmit } from "../common/forms";

    let showModal: boolean = false;

    let taskName: string;
    let taskDescription: string;
    let taskDeadlineDateStr: string;
    $: taskDeadlineDate = new Date(taskDeadlineDateStr);

    const handleTaskAdd = async() => {
        const response = await api.task.create(taskName, taskDescription, taskDeadlineDate);
        if (response.statusCode === 201) {
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                showModal = false;
                tasks.setValues(fetchedTasks.data);
            }
        }
    }
</script>

<div class="d-flex align-items-center justify-content-between">
    <span>What do you need to do?</span>
    <button type="button" class="btn btn-primary" on:click={() => showModal = true}>
        Add Task
    </button>
</div>

<Modal bind:show={showModal}>
    <span slot="title">Add Task</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formTaskAdd" on:submit={handleTaskAdd} className="d-flex flex-column gap-2">
                <FormFloating id="taskName">
                    <FormInput bind:value={taskName} placeholder="Name" required={true} min={4} max={64} />
                    <span slot="label">Name</span>
                </FormFloating>
                <FormFloating id="taskDescription">
                    <FormTextarea bind:value={taskDescription} placeholder="Description" />
                    <span slot="label">Description</span>
                </FormFloating>
                <FormFloating id="taskDeadlineDate">
                    <FormInput type="date" bind:value={taskDeadlineDateStr} placeholder="Deadline Date" required={true} />
                    <span slot="label">Deadline Date</span>
                </FormFloating>
            </FormCard>
        </div>
    </div>
    <div slot="footer">
        <FormSubmit form="formTaskAdd">Add</FormSubmit>
    </div>
</Modal>
