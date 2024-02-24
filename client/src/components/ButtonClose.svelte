<script lang="ts">
    export let className: string = "";
    export let onClick: () => void;
</script>

<button type="button" class="btn-close btn-close-white {className}" aria-label="Close" on:click={onClick}></button>
