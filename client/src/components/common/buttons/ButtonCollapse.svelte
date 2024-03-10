<script lang="ts">
    import { slide } from "svelte/transition";

    let expanded = false;

    export let className: string = "";
</script>

<div>
    <button class="btn btn-outline-light {className}" type="button" on:click={() => expanded = !expanded}>
        {#if expanded}
            <i class="bi bi-chevron-down"></i>
        {:else}
            <i class="bi bi-chevron-right"></i>
        {/if}
        <slot name="name"/>
    </button>
    

    {#if expanded}
        <div transition:slide={{ axis: "y", duration: 200 }} class="ms-4">
            <slot/>
        </div>
    {/if}
</div>

<style>
    button {
        border: none !important;
    }
</style>
