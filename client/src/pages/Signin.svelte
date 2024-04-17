<script lang="ts">
    import { auth } from "@stores/auth";
    import { onMount } from "svelte";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { home, signup, taskUpcoming } from "@pages/pages";
    import { ButtonLink } from "@components/common/buttons";
    import { FormCard, FormFloating, FormInput, FormSubmit } from "@components/common/forms";
    import HomeIntroduction from "@components/common/HomeIntroduction.svelte";
    import Card from "@components/common/Card.svelte";
    import VerifyEmail from "@components/common/VerifyEmail.svelte";
    import Verify2FA from "@components/common/Verify2FA.svelte";

    onMount(() => {
        if ($auth.cookie) {
            home.beforeNavigate();
        }
    });

    let email: string;
    let password: string;
    let showVerifyModal: boolean = false;
    let show2FAModal: boolean = false;

    const handleSignin = async() => {
        const response = await api.auth.signin(email, password);
        helpers.response.handleResponse(response, "Sign in", async() => {
            auth.setCookie();
            await taskUpcoming.beforeNavigate();
        });
        if (response.statusCode === 403) {
            if (response.details.notVerified) {
                showVerifyModal = true;
                return;
            }
            if (response.details.otpEnabled) {
                show2FAModal = true;
                return;
            }
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
                    <FormFloating id="email">
                        <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
                        <span slot="label">Email</span>
                    </FormFloating>
                    <FormFloating id="password">
                        <FormInput bind:value={password} type="password" placeholder="Password" required={true} />
                        <span slot="label">Password</span>
                    </FormFloating>
                </FormCard>
            </div>
            <div class="w-75">
                <FormSubmit form="formSignin" className="btn-secondary w-100">Sign in</FormSubmit>
            </div>
            <div class="w-75 text-center d-flex align-items-center justify-content-center">
                <span>Don't have an account?</span>
                <ButtonLink on:click={() => signup.beforeNavigate()}>
                    Sign up
                </ButtonLink>
            </div>
        </div>
    </Card>
</HomeIntroduction>
<VerifyEmail bind:show={showVerifyModal} bind:email bind:password />
<Verify2FA bind:show={show2FAModal} bind:email bind:password />
