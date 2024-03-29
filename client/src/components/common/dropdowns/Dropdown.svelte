<script lang="ts">
    let show: boolean = false;
</script>

<div class="dp">
    <button 
        type="button" 
        class="btn btn-secondary w-100 border-0"
        class:rounded-bottom-0={show}
        class:bg-tertiary={show}
        on:click={() => show = !show}>
        <slot name="label"/>
    </button>
    {#if show}
        <div class="dp-items w-100 bg-secondary">
            <slot name="dropdown-items"/>
        </div>
    {/if}
</div>

<style lang="scss">
    .dp {
        position: relative;
        display: inline-block;
        min-width: 8rem;
    }

    .dp-items {
        position: absolute;
        z-index: 1;
    }
</style>
