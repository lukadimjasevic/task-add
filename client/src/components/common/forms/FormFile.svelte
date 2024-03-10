<script lang="ts">
    let ref: HTMLInputElement;
</script>

<button type="button" class="btn" on:click={() => ref.click()}>
    <slot/>
</button>
<input type="file" class="d-none" bind:this={ref} on:change />
