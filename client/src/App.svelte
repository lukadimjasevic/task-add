<script lang="ts">
    import { auth } from "@stores/auth";
    import { Router, Route } from "svelte-routing";
    import { pages } from "@pages/pages";
    import { LayoutApp } from "@components/common/layouts";
    import ProtectedRoute from "@components/common/ProtectedRoute.svelte";
    import DataFetcher from "@components/common/DataFetcher.svelte";
  
    export const url = "";
</script>

{#if $auth.cookie}
    <DataFetcher>
        <Router {url}>
            {#each pages as page}
                {#if page.protected}
                    <ProtectedRoute path={page.path}>
                        <LayoutApp {page} />
                    </ProtectedRoute>
                {:else}
                    <Route path={page.path}>
                        <LayoutApp {page} />
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
                    <LayoutApp {page} />
                </Route>
            {/if}
        {/each}
    </Router>
{/if}
