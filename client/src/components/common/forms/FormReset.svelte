<script lang="ts">
    export let className: string = "";
    export let form: string | null = null;
</script>

<button
    type="reset"
    class={"btn btn-secondary " + className}
    {form}
    on:click>
    <slot/>
</button>
