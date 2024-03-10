<script lang="ts">
    export let onClick: () => Promise<void>;
</script>

<button type="button" class="btn btn-outline-light w-100 text-start border-0 p-1" on:click={onClick}><slot/></button>
