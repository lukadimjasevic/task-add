<script lang="ts">
    import { auth } from "./stores/auth";
    import { Router, Route } from "svelte-routing";
    import { pages } from "./pages/pages";
    import Layout from "./components/Layout.svelte";
    import ProtectedRoute from "./components/ProtectedRoute.svelte";
    import DataFetcher from "./components/DataFetcher.svelte";
  
    export const url = "";
</script>

{#if $auth.cookie}
    <DataFetcher>
        <Router {url}>
            {#each pages as page}
                {#if page.protected}
                    <ProtectedRoute path={page.path}>
                        <Layout {page} />
                    </ProtectedRoute>
                {:else}
                    <Route path={page.path}>
                        <Layout {page} />
                    </Route>
                {/if}
            {/each}
        </Router>
    </DataFetcher>
{:else}
    <Router {url}>
        {#each pages as page}
            {#if !page.protected}
                <Route path={page.path}>
                    <Layout {page} />
                </Route>
            {/if}
        {/each}
    </Router>
{/if}
