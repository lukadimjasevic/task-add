<script lang="ts">
    let show: boolean = false;
</script>

<div>
    <button 
        type="button" 
        class="btn btn-outline-tertiary text-dark border-0 rounded-0 p-2 ps-3 text-start w-100 d-flex justify-content-between"
        class:bg-tertiary={show}
        on:click={() => show = !show}>
        <slot name="label"/>
        <i class="bi"
           class:bi-chevron-down={!show}
           class:bi-chevron-up={show}>
        </i>
    </button>
    {#if show}
        <div class="w-100 bg-secondary">
            <slot name="dropdown-items"/>
        </div>
    {/if}
</div>

