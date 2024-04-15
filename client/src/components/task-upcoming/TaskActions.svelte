<script lang="ts">
    import { helpers } from "@helpers";
    import { Dropdown, DropdownInner, DropdownItem } from "@components/common/dropdowns";
    import type { Task } from "taskadd/task";
    import Separator from "@components/common/Separator.svelte";
    import TaskActionEdit from "./TaskActionEdit.svelte";
    import TaskActionDelete from "./TaskActionDelete.svelte";
    import TaskStatuses from "./TaskStatuses.svelte";

    const findSelectedTask = (): Task => {
        return tasksFiltered.find((task: Task) => task.selected)!;
    }

    export let tasksFiltered: Task[];

    let showEditModal: boolean = false;
    let showDeleteModal: boolean = false;
    $: tasksSelected = helpers.task.filterTasksBySelected(tasksFiltered);
    $: countSelected = tasksSelected.length;
</script>

{#if countSelected > 0}
    <Dropdown>
        <span slot="label">Actions 
            <span class="badge bg-tertiary text-dark">
                {countSelected}
            </span>
        </span>
        <div slot="dropdown-items">
            <DropdownInner>
                <span slot="label">Mark as</span>
                <div slot="dropdown-items">
                    <TaskStatuses tasksFiltered={tasksSelected} />
                </div>
            </DropdownInner>
            <Separator/>
            {#if countSelected === 1}
                <DropdownItem on:click={() => showEditModal = true}>Edit</DropdownItem>
                <Separator/>
            {/if}
            <DropdownItem on:click={() => showDeleteModal = true}>Delete</DropdownItem>
        </div>
    </Dropdown>

    {#if countSelected === 1}
        <TaskActionEdit bind:show={showEditModal} task={findSelectedTask()} />
    {/if}
    <TaskActionDelete bind:show={showDeleteModal} />
{/if}
