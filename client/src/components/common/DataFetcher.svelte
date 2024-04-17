<script lang="ts">
    import { toasts } from "@stores/toast";
    import { auth } from "@stores/auth";
    import { user } from "@stores/user";
    import { tasks } from "@stores/task";
    import { taskCategories } from "@stores/task-category";
    import { taskStatuses } from "@stores/task-status";
    import { onMount } from "svelte";
    import { api } from "@api";
    import { home } from "@pages/pages";

    let isLoaded: boolean = false;

    onMount(async() => {
        let isError: boolean = false;

        const responseUser = await api.user.get();
        if (responseUser.errorName) {
            isError = true;
        } else user.setValues(responseUser.data);

        const responseTasks = await api.task.getAll();
        if (responseTasks.errorName) {
            isError = true;
            toasts.error("Failed to fetch resource", responseTasks.message, { duration: 0 });
        } else tasks.setValues(responseTasks.data);

        const responseTaskCategories = await api.category.getAll();
        if (responseTaskCategories.errorName) {
            isError = true;
            toasts.error("Failed to fetch resource", responseTaskCategories.message, { duration: 0 });
        } else taskCategories.setValues(responseTaskCategories.data, $tasks.tasks);

        const responseTaskStatuses = await api.task.status.getAll();
        if (responseTaskStatuses.errorName) {
            isError = true;
            toasts.error("Failed to fetch resource", responseTaskStatuses.message, { duration: 0 });
        } else taskStatuses.setValues(responseTaskStatuses.data);

        isLoaded = true;
        
        if (isError) {
            auth.reset();
            await home.beforeNavigate();
        }
    });
</script>

{#if !isLoaded}
    <h1>Loading...</h1>
{:else}
    <slot/>
{/if}
