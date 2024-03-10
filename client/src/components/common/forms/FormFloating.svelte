<script lang="ts">
    export let id: string;
    export let className: string = "";
</script>

<div class="form-floating {className}">
    <slot {id}/>
    <label for={id}><slot name="label"/></label>
</div>
