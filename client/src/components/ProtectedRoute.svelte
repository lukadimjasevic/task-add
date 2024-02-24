<script lang="ts">
    import { auth } from "../stores/auth";
    import { Route } from "svelte-routing";

    export let path: string;

    $: isAuthenticated = $auth.cookie;
</script>

{#if isAuthenticated}
    <Route {path}>
        <slot/>
    </Route>
{:else}
    <h2>Access Denied</h2>
{/if}
