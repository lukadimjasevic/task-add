<script lang="ts">
    import { auth } from "@stores/auth";
    import { home, taskUpcoming } from "./pages";
    import HomeIntroduction from "@components/common/HomeIntroduction.svelte";
    import Card from "@components/common/Card.svelte";
</script>

<HomeIntroduction>
    <Card useHeader={false} className="h-100">
        <div slot="body" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 gap-3">
            <div class="w-75">
                <h2>Page couldn't be found</h2>
                {#if $auth.cookie}
                    <button type="button" class="btn btn-secondary" on:click={() => taskUpcoming.beforeNavigate()}>
                        Back to home
                    </button>
                {:else}
                    <button type="button" class="btn btn-secondary" on:click={() => home.beforeNavigate()}>
                        Back to home
                    </button>
                {/if}
            </div>
        </div>
    </Card>
</HomeIntroduction>
