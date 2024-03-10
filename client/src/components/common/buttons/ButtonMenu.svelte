<script lang="ts">
    export let className: string = "";
</script>

<button type="button" class="btn text-light {className}" on:click><i class="bi bi-list h4"></i></button>

<style>
    button:hover {
        background: none !important;
    }
</style>
