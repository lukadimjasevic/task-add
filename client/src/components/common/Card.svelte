<script lang="ts">
    export let className: string = "";
    export let useHeader: boolean = true;
</script>


<div class="col-md-10 card {className}">
    {#if useHeader}
        <div class="card-header"><slot name="header"/></div>
    {/if}
    <div class="card-body">
        <slot name="body"/>
    </div>
</div>
