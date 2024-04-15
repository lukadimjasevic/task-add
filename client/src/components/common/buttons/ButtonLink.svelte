<script lang="ts">
    export let className: string = "";
    export let disabled: boolean = false;
</script>

<button 
    type="button" 
    class="btn border-0 text-decoration-underline pt-1 {className}" 
    {disabled}
    on:click>
    <slot/>
</button>
