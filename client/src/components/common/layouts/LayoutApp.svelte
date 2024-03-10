<script lang="ts">
    import { auth } from "../../../stores/auth";
    import type { Page } from "taskadd/page";
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";
    import Sidebar from "../Sidebar.svelte";
    
    export let page: Page;
</script>

{#if !$auth.cookie}
    <div class="container-fluid p-0">
        <Header />

        <main class="bg-dark text-light">
            <svelte:component this={page.component} />
        </main>
        
        <Footer />
    </div>
{:else}
    <div class="container-fluid p-0">
        <Header />

        <Sidebar />
        <main class="bg-dark text-light">
            <svelte:component this={page.component} />
        </main>
        
        <Footer />
    </div>
{/if}


<style>
    main {
        min-height: 93vh;
    }
</style>
