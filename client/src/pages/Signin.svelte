<script lang="ts">
    import { auth } from "../stores/auth";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { api } from "../api";
    import { home, signup, taskUpcoming } from "./pages";
    import { FormCard, FormInput, FormSubmit } from "../components/common/forms";
    import HomeIntroduction from "../components/common/HomeIntroduction.svelte";
    import Card from "../components/common/Card.svelte";

    onMount(() => {
        if ($auth.cookie) {
            navigate(home.path);
        }
    });

    let email: string;
    let password: string;

    const handleSignin = async() => {
        const response = await api.auth.signin(email, password);
        if (response.statusCode === 200) {
            auth.setCookie();
            navigate(taskUpcoming.path);
        }
    }
</script>

<HomeIntroduction>
    <Card useHeader={false} className="h-100">
        <div slot="body" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 gap-3">
            <div class="w-75">
                <h2>Sign in</h2>
            </div>
            <div class="w-75">
                <FormCard id="formSignin" on:submit={handleSignin} className="d-flex flex-column gap-2">
                    <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
                    <FormInput bind:value={password} type="password" placeholder="Password" required={true} />
                </FormCard>
            </div>
            <div class="w-75">
                <FormSubmit form="formSignin" className="btn-secondary w-100">Sign in</FormSubmit>
            </div>
            <div class="w-75 text-center">
                <span>Don't have an account?</span>
                <button type="button" class="btn border-0" on:click={signup.beforeNavigate}>Sign up</button>
            </div>
        </div>
    </Card>
</HomeIntroduction>
