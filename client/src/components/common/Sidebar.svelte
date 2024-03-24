<script lang="ts">
    import { sidebar } from "../../stores/sidebar";
    import { slide } from "svelte/transition";
    import { ButtonMenu, ButtonClose } from "./buttons";
    import { security, taskUpcoming, signout } from "../../pages/pages";
    import SidebarSection from "./SidebarSection.svelte";
    import SidebarSectionItem from "./SidebarSectionItem.svelte";
</script>

{#if $sidebar}
    <div transition:slide={{ axis: "x", duration: 300 }} class="sidebar bg-secondary rounded-3 p-3">
        <div>
            <div class="d-flex justify-content-between">
                <h4>Menu</h4>
                <ButtonClose on:click={() => sidebar.setValues(false)} className="btn-close" />
            </div>

            <div>
                <hr class="hr" />
                <SidebarSection>
                    <small slot="label"><b>Tasks</b></small>
                    <SidebarSectionItem on:click={taskUpcoming.beforeNavigate}>
                        <i slot="icon" class="bi bi-chevron-double-right"></i>
                        <span slot="label">{taskUpcoming.name}</span>
                    </SidebarSectionItem>
                    <SidebarSectionItem>
                        <i slot="icon" class="bi bi-list-check"></i>
                        <span slot="label">Today</span>
                    </SidebarSectionItem>
                    <SidebarSectionItem>
                        <i slot="icon" class="bi bi-calendar3"></i>
                        <span slot="label">Calendar</span>
                    </SidebarSectionItem>
                </SidebarSection>
                <hr class="hr" />
                <SidebarSection>
                    <small slot="label"><b>Categories</b></small>
                    <SidebarSectionItem>
                        <i slot="icon" class="bi bi-plus-lg"></i>
                        <span slot="label">Add New Category</span>
                    </SidebarSectionItem>
                </SidebarSection>
                <hr class="hr" />
            </div>
        </div>

        <div>
            <SidebarSection>
                <!-- TODO: Merge security and profile pages to settings page -->
                <SidebarSectionItem on:click={security.beforeNavigate}>
                    <i slot="icon" class="bi bi-sliders2"></i>
                    <span slot="label">Settings</span>
                </SidebarSectionItem>
                <SidebarSectionItem on:click={signout.beforeNavigate}>
                    <i slot="icon" class="bi bi-box-arrow-right"></i>
                    <span slot="label">Sign out</span>
                </SidebarSectionItem>
            </SidebarSection>
        </div>
    </div>
{:else}
    <ButtonMenu on:click={() => sidebar.setValues(true)}/>
{/if}

<style lang="scss">
    .sidebar {
        width: 20rem;
        min-height: calc(100vh - 2 * $spacer);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
