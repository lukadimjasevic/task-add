<script lang="ts">
    export let className: string = "";
    export let disabled: boolean = false;
    export let dataBsDismiss: string | null = null;
</script>

<button
    type="submit" 
    class={"btn btn-primary " + className} 
    {disabled}
    data-bs-dismiss={dataBsDismiss ? dataBsDismiss : null}
    >
    <slot/>
</button>

<style>
    button {
        height: 3rem;
    }
</style>
