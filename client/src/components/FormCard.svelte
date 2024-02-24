<script lang="ts">
    export let className: string = "";
    export let onSubmit: () => void;
</script>

<form class={className} on:submit|preventDefault={onSubmit}>
    <slot/>
</form>
