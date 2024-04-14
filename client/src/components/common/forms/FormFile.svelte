<script lang="ts">
    export let className: string = "";
    let ref: HTMLInputElement;
</script>

<div class={className}>
    <button type="button" class="btn h-100 w-100 p-0" on:click={() => ref.click()}>
        <slot/>
    </button>
    <input type="file" class="d-none" bind:this={ref} on:change />
</div>
