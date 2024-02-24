<script lang="ts">
    export let type: string = "text";
    export let value: string = "";
    export let name: string | null = null;
    export let placeholder: string | null = null;
    export let className: string = "";
    export let required: boolean = false;
    export let disabled: boolean = false;

    const onInput = (event: Event) => {
        value = (event.target as HTMLInputElement).value;
    };
</script>

<input class={"form-control " + className} {type} {value} {name} {placeholder} {required} {disabled} on:input={onInput} />

<style>
    input {
        height: 3rem;
    }
</style>