<script lang="ts">
    import { Dropdown, DropdownInner, DropdownItem } from "@components/common/dropdowns";
    import type { Task } from "taskadd/task";
    import Separator from "@components/common/Separator.svelte";
    import TaskActionEdit from "./TaskActionEdit.svelte";
    import TaskActionDelete from "./TaskActionDelete.svelte";

    const findSelectedTask = (): Task => {
        return tasksFiltered.find((task: Task) => task.selected)!;
    }

    const countSelectedFiltered = (filteredTasks: Task[]): number => {
        return filteredTasks.filter((task: Task) => task.selected).length;
    }

    export let tasksFiltered: Task[];

    let showEditModal: boolean = false;
    let showDeleteModal: boolean = false;
    $: countSelected = countSelectedFiltered(tasksFiltered);
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
                    <DropdownItem>Completed</DropdownItem>
                    <DropdownItem>Active</DropdownItem>
                    <DropdownItem>Cancelled</DropdownItem>
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
