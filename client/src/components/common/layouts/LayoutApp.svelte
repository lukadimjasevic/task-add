<script lang="ts">
    import type { Page } from "taskadd/page";
    import LayoutPage from "./LayoutPage.svelte";
    
    export let page: Page;
</script>

<div class="container-fluid p-0 bg-primary layout-app">
    <LayoutPage>
        <svelte:component this={page.component} />
    </LayoutPage>
</div>
