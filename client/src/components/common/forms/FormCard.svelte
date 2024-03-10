<script lang="ts">
    export let className: string = "";
</script>

<form class={className} on:submit|preventDefault>
    <slot/>
</form>
