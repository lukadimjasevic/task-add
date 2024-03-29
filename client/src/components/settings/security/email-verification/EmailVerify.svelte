<script lang="ts">
    import { user } from "@stores/user";
    import { userOTP } from "@stores/user-otp";
    import { verificationCodeTimer } from "@stores/countdown-timer";
    import { api } from "@api";
    import { FormCard, FormSubmit } from "@components/common/forms";
    import { ButtonLink } from "@components/common/buttons";
    import Modal from "@components/common/Modal.svelte";
    import OTPInput from "@components/settings/security/OTPInput.svelte";

    let showModal: boolean = false;

    const handleSendCode = async() => {
        const now = new Date();
        const intervalTime = 1000 * 60;

        if ($user.verificationCodeLastDate && now.getTime() - $user.verificationCodeLastDate.getTime() <= intervalTime) {
            showModal = true;
            return;
        }

        const response = await api.user.generateVerificationCode();
        if (response.statusCode === 201) {
            const verificationCodeLastDate = new Date(response.data.verificationCodeLastDate);
            user.setVerificationCodeLastDate(verificationCodeLastDate);
            showModal = true;
        }

        if (!$verificationCodeTimer.isRunning) {
            verificationCodeTimer.countDown(
                new Date($user.verificationCodeLastDate.getTime() + intervalTime)
            );
        }

        return;
    }

    const handleValidateCode = async() => {
        const response = await api.user.validateVerificationCode($userOTP.token);
        if (response.statusCode === 200) {
            showModal = false;
            user.setVerified(true);
        }

        return;
    }
</script>

<button type="button" class="btn btn-primary" on:click={handleSendCode}>
    Verify
</button>

<Modal bind:show={showModal}>
    <span slot="title">Verify your Email</span>
    <div slot="body" class="row">
        <div class="col-12 text-center">
            <span>Your code was sent to <b>{$user.email}</b></span>
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
