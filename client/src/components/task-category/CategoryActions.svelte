<script lang="ts">
    import type { ExtendedTaskCategory } from "taskadd/task-category";
    import CategoryActionEdit from "@components/task-category/CategoryActionEdit.svelte";
    import CategoryActionDelete from "@components/task-category/CategoryActionDelete.svelte";
    import { Dropdown, DropdownItem } from "@components/common/dropdowns";
    import Separator from "@components/common/Separator.svelte";
    
    export let categoryId: string;
    export let category: ExtendedTaskCategory;
    
    let showDropdown: boolean = false;
    let showEditModal: boolean = false;
    let showDeleteModal: boolean = false;

    // Close action dropdown when another category is selected
    $: if (categoryId) {
        showDropdown = false;
    }
</script>

<Dropdown bind:show={showDropdown}>
    <span slot="label">Actions</span>
    <div slot="dropdown-items">
        <DropdownItem on:click={() => showEditModal = true}>Edit</DropdownItem>
        <CategoryActionEdit bind:show={showEditModal} {category}/>
        <Separator/>
        <DropdownItem on:click={() => showDeleteModal = true}>Delete</DropdownItem>
        <CategoryActionDelete bind:show={showDeleteModal} {category}/>
    </div>
</Dropdown>
