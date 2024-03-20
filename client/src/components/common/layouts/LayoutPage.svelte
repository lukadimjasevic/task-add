<script lang="ts">
    export let className: string = "";
</script>

<div class="row g-0 m-0 pt-5 d-flex flex-column align-items-center gap-4 {className}">
    <slot/>
</div>
