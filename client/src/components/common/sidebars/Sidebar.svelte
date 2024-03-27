<script lang="ts">
    import { tasks } from "@stores/task";
    import { sidebar } from "@stores/sidebar";
    import { slide } from "svelte/transition";
    import { ButtonMenu, ButtonClose } from "@components/common/buttons";
    import { taskUpcoming, taskToday, taskCalendar, settings, signout } from "@pages/pages";
    import { SidebarSection, SidebarSectionItem } from "@components/common/sidebars";
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
                        <span slot="count">{$tasks.countUpcoming}</span>
                    </SidebarSectionItem>
                    <SidebarSectionItem on:click={taskToday.beforeNavigate}>
                        <i slot="icon" class="bi bi-list-check"></i>
                        <span slot="label">{taskToday.name}</span>
                        <span slot="count">{$tasks.countToday}</span>
                    </SidebarSectionItem>
                    <SidebarSectionItem on:click={taskCalendar.beforeNavigate}>
                        <i slot="icon" class="bi bi-calendar3"></i>
                        <span slot="label">{taskCalendar.name}</span>
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
                <SidebarSectionItem on:click={settings.beforeNavigate}>
                    <i slot="icon" class="bi bi-sliders2"></i>
                    <span slot="label">{settings.name}</span>
                </SidebarSectionItem>
                <SidebarSectionItem on:click={signout.beforeNavigate}>
                    <i slot="icon" class="bi bi-box-arrow-right"></i>
                    <span slot="label">{signout.name}</span>
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
