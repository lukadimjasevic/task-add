<script lang="ts">
    import { signup, signin } from "@pages/pages";
    import HomeIntroduction from "@components/common/HomeIntroduction.svelte";
    import Card from "@components/common/Card.svelte";
</script>

<HomeIntroduction>
    <Card useHeader={false} className="h-100">
        <div slot="body" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 gap-3">
            <div class="w-75">
                <h2>TaskAdd</h2>
                <span>Task management web application that helps you to organize your time</span>
            </div>
            <div class="w-75">
                <button type="button" class="btn btn-secondary w-100" on:click={signup.beforeNavigate}>
                    Get Started
                </button>
            </div>
            <div class="w-75 text-center">
                <span>Already have an account?</span>
                <button type="button" class="btn border-0" on:click={signin.beforeNavigate}>Sign in</button>
            </div>
        </div>
    </Card>
</HomeIntroduction>
