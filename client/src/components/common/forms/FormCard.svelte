<script lang="ts">
    export let id: string = "";
    export let className: string = "";
</script>

<form class={className} {id} on:submit|preventDefault>
    <slot/>
</form>
