<script lang="ts">
    export let className: string = "";
</script>


<div class="col-md-6 card {className}">
    <div class="card-header"><slot name="header"/></div>
    <div class="card-body">
        <slot name="body"/>
    </div>
</div>
