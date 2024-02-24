<script lang="ts">
    export let className: string = "";
    export let disabled: boolean = false;
</script>

<button type="submit" class={"btn btn-primary " + className} {disabled}><slot/></button>

<style>
    button {
        height: 3rem;
    }
</style>
