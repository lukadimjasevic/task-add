<script lang="ts">
    export let id: string;
    export let checked: boolean;
    export let disabled: boolean = false;
    export let className: string = "";
</script>

<div class="form-check form-switch {className}">
    <input class="form-check-input" type="checkbox" role="switch" {id} {checked} {disabled}>
    <label class="form-check-label" for={id}><slot/></label>
</div>
  
