<script lang="ts">
    import { sidebar } from "../../stores/sidebar";
    import { slide } from "svelte/transition";
    import { ButtonClose } from "./buttons";
    import { ButtonCollapse } from "./buttons";
    import SidebarLink from "./SidebarLink.svelte";
    import { home, profile, security } from "../../pages/pages";

</script>

{#if $sidebar}
    <div transition:slide={{ axis: "x", duration: 300 }} class="sidebar bg-dark border-end border-light border-opacity-10 text-light p-3">
        <div class="d-flex flex-row-reverse">
            <ButtonClose on:click={() => sidebar.set(false)} className="btn-close-white" />
        </div>
        <hr class="hr" />
        <div>
            <ButtonCollapse className="w-100 text-start">
                <span slot="name">Home</span>
                <SidebarLink onClick={home.beforeNavigate}>Overview</SidebarLink>
            </ButtonCollapse>
            <ButtonCollapse className="w-100 text-start">
                <span slot="name">Tasks</span>
                <SidebarLink onClick={profile.beforeNavigate}>Overview</SidebarLink>
            </ButtonCollapse>
            <hr class="hr" />
            <ButtonCollapse className="w-100 text-start">
                <span slot="name">Account</span>
                <SidebarLink onClick={profile.beforeNavigate}><i class="bi bi-person me-2"></i> {profile.name}</SidebarLink>
                <SidebarLink onClick={security.beforeNavigate}><i class="bi bi-lock me-2"></i> {security.name}</SidebarLink>
                <SidebarLink onClick={profile.beforeNavigate}><i class="bi bi-box-arrow-left me-2"></i> Sign Out</SidebarLink>
            </ButtonCollapse>
        </div>
    </div>
{/if}

<style>
    .sidebar {
        width: 20rem;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>
