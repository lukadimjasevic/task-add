<script lang="ts">
    import { user } from "@stores/user";
    import { userOTP } from "@stores/user-otp";
    import { verificationCodeTimer } from "@stores/countdown-timer";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import type { UserVerificationGenerateDTO, UserVerificationValidateDTO } from "taskadd/user";
    import { signin } from "@pages/pages";
    import { FormCard, FormSubmit } from "@components/common/forms";
    import { ButtonLink } from "@components/common/buttons";
    import Modal from "@components/common/Modal.svelte";
    import OTPInput from "@components/settings/security/OTPInput.svelte";

    export let show: boolean = false;
    export let email: string;
    export let password: string;

    const handleSendCode = async() => {
        const now = new Date();
        const intervalTime = 1000 * 60;

        if ($user.verificationCodeLastDate && now.getTime() - $user.verificationCodeLastDate.getTime() <= intervalTime) {
            show = true;
            return;
        }

        const dto: UserVerificationGenerateDTO = { email, password };
        const response = await api.user.generateVerificationCode(dto);
        helpers.response.handleResponse(response, "Email verification", () => {
            const verificationCodeLastDate = new Date(response.data.verificationCodeLastDate);
            user.setVerificationCodeLastDate(verificationCodeLastDate);
            show = true;
        });

        if (!$verificationCodeTimer.isRunning) {
            verificationCodeTimer.countDown(
                new Date($user.verificationCodeLastDate.getTime() + intervalTime)
            );
        }

        return;
    }

    const handleValidateCode = async() => {
        const dto: UserVerificationValidateDTO = { email, password, code: $userOTP.token }
        const response = await api.user.validateVerificationCode(dto);
        helpers.response.handleResponse(response, "Email verification", async() => {
            user.setVerified(true);
            show = false;
            await signin.beforeNavigate();
        });
        return;
    }
</script>

<Modal bind:show useCloseButtons={false}>
    <span slot="title">Verify your email</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span class="d-bloc">
                Your verification code was sent to <b>{email}</b>. 
                Please check your email inbox for a verification message. 
                Rewrite the code provided in the email into the verification field here in the app.
            </span>
            <span class="d-block mt-2">
                If you haven't received the email within a few minutes, please check your spam folder or request a new verification email.
            </span>
        </div>
        <div class="col-12">
            <FormCard on:submit={handleValidateCode} className="my-3 d-flex flex-column gap-3">
                <OTPInput />
                <FormSubmit className="w-100">Verify & Continue</FormSubmit>
            </FormCard>
        </div>
        <div class="col-12 text-center">
            <span>Didn't receive a code?</span>
            <ButtonLink on:click={handleSendCode} disabled={$verificationCodeTimer.isRunning}>
                Resend
            </ButtonLink>
        </div>
        {#if $verificationCodeTimer.isRunning}
            <div class="col-12 text-center">
                <span>A new code can be resent in {$verificationCodeTimer.value}
                {$verificationCodeTimer.value === 1 ? "second" : "seconds"}</span>
            </div>
        {/if}
    </div>
</Modal>
