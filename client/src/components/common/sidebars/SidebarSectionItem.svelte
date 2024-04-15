<div>
    <button 
        type="button" 
        class="btn btn-outline-tertiary border-0 text-dark w-100 text-start d-flex justify-content-between" 
        on:click>
        <div class="d-flex gap-3">
            <slot name="icon"/>
            <slot name="label"/>
        </div>
        <div>
            <span class="badge bg-quaternary text-dark">
                <slot name="count"/>
            </span>
        </div>
    </button>
</div>

<style>
    button {
        font-size: 1.1rem;
    }
</style>
