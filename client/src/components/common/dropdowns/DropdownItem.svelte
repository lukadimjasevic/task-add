<script lang="ts">
    export let className: string = "";
</script>

<button 
    type="button" 
    class="btn btn-outline-tertiary text-dark border-0 rounded-0 p-2 ps-3 dp-item {className}" 
    on:click>
    <slot/>
</button>

<style lang="scss">
    .dp-item {
        text-decoration: none;
        display: block;
        width: 100%;
        text-align: left;
    }
</style>
