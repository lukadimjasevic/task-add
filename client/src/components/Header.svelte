<script lang="ts">
    import { auth } from "../stores/auth";
    import { user } from "../stores/user";
    import { sidebar } from "../stores/sidebar";
    import { Link } from "svelte-routing";
    import { home, signup, signin, profile } from "../pages/pages";
    import ButtonMenu from "./ButtonMenu.svelte";
</script>

{#if !$auth.cookie}
    <header class="row g-0 m-0 d-flex align-items-center bg-dark border-bottom border-light border-opacity-10">
        <div class="col-8 p-2">
            <Link to={home.path} class="text-light">{home.name}</Link>
        </div>
        <div class="col-2 p-2 text-center">
            <Link to={signup.path} class="text-light">{signup.name}</Link>
        </div>
        <div class="col-2 p-2 text-center">
            <Link to={signin.path} class="text-light">{signin.name}</Link>
        </div>
    </header>
{:else}
    <header class="row g-0 m-0 row-cols-1 d-flex align-items-center bg-dark text-light border-bottom border-light border-opacity-10">
        <div class="col d-flex align-items-center">
            <ButtonMenu onClick={() => sidebar.set(true)}/>
            <button type="button" on:click={profile.beforeNavigate} class="btn badge badge-primary">{$user.email}</button>
        </div>
    </header>
{/if}

<style>
    header {
        height: 7vh;
    }
</style>
