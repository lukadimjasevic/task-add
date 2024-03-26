<script lang="ts">
    import { tasks } from "@stores/task";
    import { api } from "@api";
    import type { Task } from "taskadd/task";
    import { FormCard, FormFloating, FormInput, FormTextarea, FormSubmit } from "@components/common/forms";
    import Modal from "@components/common/Modal.svelte";

    const getDefaultDate = (date: Date): string => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleEdit = async() => {
        const response = await api.task.update(task.id, taskName, taskDescription, taskDeadlineDate);
        if (response.statusCode === 200) {
            const fetchedTasks = await api.task.getAll();
            if (fetchedTasks.statusCode === 200) {
                show = false;
                tasks.setValues(fetchedTasks.data);
            }
        }
    }

    export let task: Task;
    export let show: boolean = false;

    let taskName: string = task.name;
    let taskDescription: string = task.description;
    let taskDeadlineDateStr: string = getDefaultDate(task.deadlineDate);
    $: taskDeadlineDate = new Date(taskDeadlineDateStr);
</script>

<Modal bind:show>
    <span slot="title">Edit Task - {task.name}</span>
    <div slot="body" class="row">
        <div class="col-12">
            <FormCard id="formTaskEdit" on:submit={handleEdit} className="d-flex flex-column gap-2">
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
        <FormSubmit form="formTaskEdit">Save</FormSubmit>
    </div>
</Modal>
