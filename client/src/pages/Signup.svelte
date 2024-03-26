<script lang="ts">
    import { auth } from "@stores/auth";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { api } from "@api";
    import { signin, home } from "@pages/pages";
    import { FormCard, FormInput, FormSubmit } from "@components/common/forms";
    import HomeIntroduction from "@components/common/HomeIntroduction.svelte";
    import Card from "@components/common/Card.svelte";

    onMount(() => {
        if ($auth.cookie) {
            navigate(home.path);
        }
    });

    let email: string;
    let username: string;
    let password: string;
    let passwordRetype: string;

    const handleSignup = async() => {
        const response = await api.auth.signup(email, username, password, passwordRetype);
        if (response.statusCode === 201) {
            navigate(signin.path);
        }
    };
</script>

<HomeIntroduction>
    <Card useHeader={false} className="h-100">
        <div slot="body" class="d-flex flex-column justify-content-center align-items-center h-100 w-100 gap-3">
            <div class="w-75">
                <h2>Sign up</h2>
            </div>
            <div class="w-75">
                <FormCard id="formSignup" on:submit={handleSignup} className="d-flex flex-column gap-2">
                    <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
                    <FormInput bind:value={username} placeholder="Username" required={true} />
                    <FormInput bind:value={password} type="password" placeholder="Create password" required={true} />
                    <FormInput bind:value={passwordRetype} type="password" placeholder="Confirm password" required={true} />
                </FormCard>
            </div>
            <div class="w-75">
                <FormSubmit form="formSignup" className="btn-secondary w-100">Sign up</FormSubmit>
            </div>
            <div class="w-75 text-center">
                <span>Already have an account?</span>
                <button type="button" class="btn border-0" on:click={signin.beforeNavigate}>Sign in</button>
            </div>
        </div>
    </Card>
</HomeIntroduction>
