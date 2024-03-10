<script lang="ts">
    import { slide, fade, fly } from "svelte/transition"
    import ButtonClose from "./ButtonClose.svelte";

    export let show: boolean = false;
    export let className: string = "";

    const handleClose = () => {
        show = false;
    }
</script>

{#if show}
    <div transition:fly={{ duration: 300 }} class="custom-modal row {className}">
        <div class="custom-modal-content bg-light col-md-8 col-lg-5 border rounded">
            <div class="custom-modal-header border-bottom m-3 pb-2">
                <h1 class="custom-modal-header fs-5 m-0"><slot name="title"/></h1>
                <ButtonClose on:click={handleClose} className="btn-close-black" />
            </div>
            <div class="custom-modal-body mx-3">
                <slot name="body"/>
            </div>
            <div class="custom-modal-footer m-3">
                <button type="button" class="btn btn-secondary" on:click={handleClose}>Close</button>
                <slot name="footer"/>
            </div>
        </div>
    </div>
{/if}

<style>
    .custom-modal {
        position: fixed;
        z-index: 1;
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
    }
</style>
