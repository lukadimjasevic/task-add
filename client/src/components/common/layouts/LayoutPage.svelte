<script lang="ts">
    import { auth } from "../../../stores/auth";
    import { Sidebar } from "../sidebars";
    export let className: string = "";
</script>

<div class="d-flex align-items-stretch p-3 gap-3 layout-page {className}">
    {#if $auth.cookie}
        <div>
            <Sidebar />
        </div>
    {/if}
    <div class="w-100">
        <slot/>
    </div>
</div>

<style>
    .layout-page {
        min-height: 100vh;
    }
</style>
