<script lang="ts">
    export let checked: boolean = false;
    export let className: string = "";
</script>

<input type="checkbox" class="form-check-input {className}" bind:checked on:change />
