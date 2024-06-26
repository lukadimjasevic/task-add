<script lang="ts">
    import { taskCategories } from "@stores/task-category";
    import type { TaskCategory } from "taskadd/task-category";
    import { FormFloating } from "@components/common/forms";

    let showCategories: boolean = false;
    let searchValue: string;
    let inputElement: HTMLInputElement;
    
    export let categoriesUsed: TaskCategory[];
    export let updateCategories: (categories: TaskCategory[]) => void;

    $: categoriesAvailable = getAvailableCategories($taskCategories.categories, categoriesUsed);

    const getAvailableCategories = (categoriesAll: TaskCategory[], categoriesUsed: TaskCategory[]): TaskCategory[] => {
        const categoriesAvailable: TaskCategory[] = [];
        for (const storedCategory of categoriesAll) {
            let isUsed: boolean = false;
            for (const categoryUsed of categoriesUsed) {
                if (categoryUsed.id === storedCategory.id) {
                    isUsed = true;
                    break;
                }
            }
            if (!isUsed) categoriesAvailable.push(storedCategory);
        }
        return categoriesAvailable;
    }

    const onclickAddCategory = (category: TaskCategory) => {
        updateCategories([...categoriesUsed, category]);
        categoriesAvailable = getAvailableCategories($taskCategories.categories, categoriesUsed);
        inputElement.focus();
    }

    const oninputFilterCategories = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        const categoriesAvailableForm = getAvailableCategories($taskCategories.categories, categoriesUsed);
        if (value.length > 0) {
            categoriesAvailable = categoriesAvailableForm.filter((storedCategory: TaskCategory) =>
                storedCategory.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
        } else {
            categoriesAvailable = categoriesAvailableForm;
        }
    }
</script>

<div class="dropdown-categories">
    <FormFloating id="category">
        <input 
            type="text" 
            class="form-control"
            placeholder="Pick a category"
            bind:value={searchValue}            
            on:focus={() => showCategories = true}
            on:blur={(event) => {
                const target = event.relatedTarget instanceof HTMLElement ? event.relatedTarget : document.activeElement;
                if (!target || !target.closest(".dropdown-categories")) {
                    showCategories = false;
                }
            }}
            on:input={(event) => oninputFilterCategories(event)}
            bind:this={inputElement}
        />
        <span slot="label">Pick a category</span>
    </FormFloating>

    {#if showCategories}
        <div class="bg-primary border rounded dropdown-categories-items w-100">
            {#each categoriesAvailable as category (category)}
                <button type="button" class="btn btn-primary d-flex gap-3 w-100" on:click={() => onclickAddCategory(category)}>
                    <i class="bi bi-square-fill" style="color: {category.color};"></i>
                    <span>{category.name}</span>
                </button>
            {/each}
            {#if categoriesAvailable.length === 0}
                <div class="m-2">
                    <span>No categories found</span>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .dropdown-categories {
        position: relative;
    }

    .dropdown-categories-items {
        position: absolute;
        overflow-y: auto;
        max-height: 15rem;
    }
</style>
