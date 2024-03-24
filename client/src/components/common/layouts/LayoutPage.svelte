<script lang="ts">
    import Sidebar from "../Sidebar.svelte";
    export let className: string = "";
</script>

<div class="d-flex align-items-stretch p-3 gap-3 {className}">
    <div>
        <Sidebar />
    </div>
    <div class="w-100">
        <slot/>
    </div>
</div>
