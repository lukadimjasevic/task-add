<script lang="ts">
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { ButtonClose } from "@components/common/buttons";

    export let show: boolean = false;
    export let className: string = "";
    export let useCloseButtons: boolean = true;

    const dispatch = createEventDispatcher();

    const handleClose = () => {
        show = false;
        dispatch("close");
    }
</script>

{#if show}
    <div transition:fly={{ duration: 300 }} class="custom-modal row {className}">
        <div class="custom-modal-content bg-light col-md-8 col-lg-5 border rounded p-0">
            <div class="custom-modal-header border-bottom m-3 pb-2">
                <h1 class="custom-modal-header fs-5 m-0"><slot name="title"/></h1>
                {#if useCloseButtons}
                    <ButtonClose on:click={handleClose} className="btn-close-black" />
                {/if}
            </div>
            <div class="custom-modal-body mx-3">
                <slot name="body"/>
            </div>
            <div class="custom-modal-footer m-3">
                {#if useCloseButtons}
                    <button type="button" class="btn btn-secondary" on:click={handleClose}>Close</button>
                {/if}
                <slot name="footer"/>
            </div>
        </div>
    </div>
{/if}

<style>
    .custom-modal {
        position: fixed;
        z-index: 2;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .custom-modal-content {
        margin: auto;
    }

    .custom-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .custom-modal-footer {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 0.5rem;
    }
</style>
