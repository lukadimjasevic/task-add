<script lang="ts">
    import { onMount } from "svelte";
    import type { CustomStore } from "taskadd/store";

    let isLoaded: boolean = false;
    let error: null | { errorName: string, message: string } = null;

    onMount(async() => {
        const response = await fetchFunc();
        if (response.errorName) {
            error = { errorName: response.errorName, message: response.message };
            isLoaded = true;
            return;
        }
        store.setValues(response.data);
        isLoaded = true;
        return;
    });

    export let fetchFunc: () => Promise<any>;
    export let store: CustomStore;
</script>

{#if !isLoaded}
    <h1>Loading...</h1>
{:else}
    {#if error} 
        <h1>Error while trying to fetch resource: {error.errorName}: {error.message}</h1>
    {:else}
        <slot/>
    {/if}
{/if}
