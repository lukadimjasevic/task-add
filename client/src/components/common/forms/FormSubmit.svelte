<script lang="ts">
    export let className: string = "";
    export let disabled: boolean = false;
    export let form: string | null = null;
</script>

<button
    type="submit"
    class={"btn btn-secondary " + className}
    {disabled}
    {form}>
    <slot/>
</button>
