<script lang="ts">
    import { user } from "../../stores/user";
    import { onMount } from "svelte";
    import { api } from "../../api";

    let isLoaded: boolean = false;
    let errors: { errorName: string, message: string }[] = [];

    onMount(async() => {
        const responseUser = await api.user.get();
        if (responseUser.errorName) {
            errors.push({ errorName: responseUser.errorName, message: responseUser.message });
            isLoaded = true;
            return;
        }
        user.setValues(responseUser.data);
        isLoaded = true;
        return;
    });
</script>

{#if !isLoaded}
    <h1>Loading...</h1>
{:else}
    {#if errors.length} 
        <h1>Error while trying to fetch resource:</h1>
        {#each errors as error}
            <h4>{error.errorName}: {error.message}</h4>
        {/each}
    {:else}
        <slot/>
    {/if}
{/if}
