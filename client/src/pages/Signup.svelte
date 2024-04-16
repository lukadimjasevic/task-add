<script lang="ts">
    import { auth } from "@stores/auth";
    import { user } from "@stores/user";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { signin, home } from "@pages/pages";
    import { FormCard, FormFloating, FormInput, FormSubmit } from "@components/common/forms";
    import HomeIntroduction from "@components/common/HomeIntroduction.svelte";
    import Card from "@components/common/Card.svelte";
    import EmailVerify from "@components/common/EmailVerify.svelte";

    onMount(() => {
        if ($auth.cookie) {
            navigate(home.path);
        }
    });

    let email: string;
    let username: string;
    let password: string;
    let passwordRetype: string;
    let showVerifyModal: boolean = false;

    const handleSignup = async() => {
        const response = await api.auth.signup(email, username, password, passwordRetype);
        helpers.response.handleResponse(response, "Sign up", () => {
            user.setValues(response.data);
            showVerifyModal = true;
        });
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
                    <FormFloating id="email">
                        <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
                        <span slot="label">Email</span>
                    </FormFloating>
                    <FormFloating id="username">
                        <FormInput bind:value={username} placeholder="Username" required={true} />
                        <span slot="label">Username</span>
                    </FormFloating>
                    <FormFloating id="password">
                        <FormInput bind:value={password} type="password" placeholder="Create password" required={true} />
                        <span slot="label">Password</span>
                    </FormFloating>
                    <FormFloating id="passwordConfirm">
                        <FormInput bind:value={passwordRetype} type="password" placeholder="Confirm password" required={true} />
                        <span slot="label">Confirm password</span>
                    </FormFloating>
                </FormCard>
            </div>
            <div class="w-75">
                <FormSubmit form="formSignup" className="btn-secondary w-100">Sign up</FormSubmit>
            </div>
            <div class="w-75 text-center">
                <span>Already have an account?</span>
                <button type="button" class="btn border-0" on:click={() => signin.beforeNavigate()}>Sign in</button>
            </div>
        </div>
    </Card>
</HomeIntroduction>
<EmailVerify bind:show={showVerifyModal} bind:email bind:password />
