<script lang="ts">
    export let value: string = "";
    export let placeholder: string | null = null;
    export let disabled: boolean = false;
    export let className: string = "";
</script>

<textarea class="form-control {className}" bind:value {placeholder} {disabled}></textarea>

<style>
    textarea {
        min-height: 10rem !important;
    }
</style>
