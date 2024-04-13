<script lang="ts">
    import { toasts } from "@stores/toast";
    import { fly } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { linear } from "svelte/easing";
    import type { Toast } from "taskadd/toast";
    import { ButtonClose } from "@components/common/buttons";

    export let toast: Toast;
    const flyDuration = 1000;
    
    const progress = tweened(1, {
        duration: toast.duration,
        easing: linear,
    });

    if (toast.duration) {
        setTimeout(() => {
            progress.set(0);
        }, flyDuration);

        setTimeout(() => {
            toasts.remove(toast);
        }, toast.duration! + flyDuration);
    }
</script>

<div class="mb-2" in:fly={{ x: 350, duration: flyDuration }} out:fly={{ x: 350, duration: flyDuration }}>
    <div class="d-flex" 
        class:bg-toast-success-primary={toast.type === "success"}
        class:border-toast-success-secondary={toast.type === "success"}
        class:bg-toast-error-primary={toast.type === "error"}
        class:border-toast-error-secondary={toast.type === "error"}>
        <div class="border-start border-3 d-flex p-2" 
            class:border-toast-success-secondary={toast.type === "success"}
            class:border-toast-error-secondary={toast.type === "error"}>
            {#if toast.type === "success"}
                <i class="bi bi-check-circle-fill text-toast-success-secondary h5"></i>
            {:else if toast.type === "error"}
                <i class="bi bi-slash-circle-fill text-toast-error-secondary h5"></i>
            {/if}
        </div>
        <div class="p-2 w-100" style="position: relative;">
            <div>
                <span><b>{toast.title}</b></span>
            </div>
            <div>
                <span>{toast.description}</span>
            </div>
        </div>
        <div class="d-flex justify-content-end p-2">
            <ButtonClose on:click={() => toasts.remove(toast)}/>
        </div>
    </div>
    {#if toast.duration !== 0}
        <progress value={$progress} 
            class="rounded-0 border-0"
            class:bg-toast-success-primary={toast.type === "success"}
            class:bg-toast-error-primary={toast.type === "error"}
        />
    {/if}
</div>

<style>
    progress {
        width: 100%;
        display: block;
        height: 0.25rem;
    }
</style>
