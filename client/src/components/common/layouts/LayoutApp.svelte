<script lang="ts">
    import { auth } from "../../../stores/auth";
    import type { Page } from "taskadd/page";
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";
    import Sidebar from "../Sidebar.svelte";
    import LayoutPage from "./LayoutPage.svelte";
    
    export let page: Page;
</script>

{#if !$auth.cookie}
    <div class="container-fluid p-0 bg-primary">
        <!--Header /-->

        <main class="text-light">
            <svelte:component this={page.component} />
        </main>
        
        <!--Footer /-->
    </div>
{:else}
    <div class="container-fluid p-0 bg-primary">
        <!--Header /-->

        <LayoutPage>
            <svelte:component this={page.component} />
        </LayoutPage>
        
        <!--Sidebar />
        <main class="text-light">
            <svelte:component this={page.component} />
        </main-->
        
        <!--Footer /-->
    </div>
{/if}


<style>
    main {
        min-height: 100vh;
    }
</style>
