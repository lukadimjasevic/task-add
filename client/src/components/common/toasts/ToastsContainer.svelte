<script lang="ts">
    import { toasts } from "@stores/toast";
    import type { Toast } from "taskadd/toast";
    import { ToastNotification } from "@components/common/toasts";

    let notifications: Toast[];
    $: notifications = $toasts;
</script>

<div class="toasts-container-wrapper p-2">
    {#each notifications as toast (toast.uuid)}
        <ToastNotification {toast} />  
    {/each}
</div>

<style>
    .toasts-container-wrapper {
        position: fixed;
        z-index: 5;
        right: 0;
        top: 0;
        width: 22.5rem;
    }
</style>
