<div>
    <button 
        type="button" 
        class="btn btn-outline-tertiary border-0 text-dark w-100 text-start d-flex gap-3" 
        on:click>
        <slot name="icon"/>
        <slot name="label"/>
    </button>
</div>

<style>
    button {
        font-size: 1.1rem;
    }
</style>
