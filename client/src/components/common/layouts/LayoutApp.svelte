<script lang="ts">
    import LayoutPage from "./LayoutPage.svelte";
</script>

<div class="container-fluid p-0 bg-primary layout-app">
    <LayoutPage>
        <slot/>
    </LayoutPage>
</div>
