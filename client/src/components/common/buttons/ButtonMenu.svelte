<script lang="ts">
    export let className: string = "";
</script>

<button type="button" class="btn {className}" on:click><i class="bi bi-list display-6"></i></button>

<style>
    button:hover {
        background: none !important;
    }
</style>
