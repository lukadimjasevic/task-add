<script lang="ts">
    import { auth } from "@stores/auth";
    import { Router, Route } from "svelte-routing";
    import type { Page } from "taskadd/page";
    import { pages } from "@pages/pages";
    import { LayoutApp } from "@components/common/layouts";
    import DataFetcher from "@components/common/DataFetcher.svelte";
  
    const publicPages = pages.filter((page: Page) => !page.protected);
    const protectedPages = pages.filter((page: Page) => page.protected);

    export const url = "";
</script>

{#if $auth.cookie}
    <DataFetcher>
        <LayoutApp>
            <Router {url}>
                {#each protectedPages as page}
                    <Route path={page.path} component={page.component}/>
                {/each}
            </Router>
        </LayoutApp>
    </DataFetcher>
{:else}
    <LayoutApp>
        <Router {url}>
            {#each publicPages as page}
                <Route path={page.path} component={page.component} />
            {/each}
        </Router>
    </LayoutApp>
{/if}
