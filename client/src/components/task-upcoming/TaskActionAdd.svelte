<script lang="ts">
    import { tasks } from "../../stores/task";
    import { api } from "../../api";
    import Modal from "../common/Modal.svelte";
    import { FormCard, FormFloating, FormInput, FormTextarea, FormSubmit } from "../common/forms";

    export let defaultDate: Date = new Date(Date.now() + 60 * 1000);
    
    const getDefaultDate = (date: Date): string => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const getDefaultTime = (date: Date): string => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    }

    const computeDeadlineDate = (date: string, time: string) => {
        const deadlineDate = new Date(date);
        const [hours, minutes] = time.split(":");
        deadlineDate.setHours(parseInt(hours));
        deadlineDate.setMinutes(parseInt(minutes));
        return deadlineDate;
    }

    let showModal: boolean = false;

    let taskName: string;
    let taskDescription: string;
    let taskDeadlineDateStr: string = getDefaultDate(defaultDate);
    let taskDeadlineDateTime: string = getDefaultTime(defaultDate); 
    $: taskDeadlineDate = computeDeadlineDate(taskDeadlineDateStr, taskDeadlineDateTime);

    const handleAdd = async() => {
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

<button type="button" 
        class="btn btn-outline-tertiary w-100 text-start text-dark add-task"
        on:click={() => showModal = true}>
    <i class="bi bi-plus-lg"></i>
    <span>Add New Task</span>
</button>

<Modal bind:show={showModal}>
    <span slot="title">Add Task</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formTaskAdd" on:submit={handleAdd} className="d-flex flex-column gap-2">
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
                <FormFloating id="taskDeadlineTime">
                    <FormInput type="time" bind:value={taskDeadlineDateTime} placeholder="Deadline Time" required={true} />
                    <span slot="label">Deadline Time</span>
                </FormFloating>
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
