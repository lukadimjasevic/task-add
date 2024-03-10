<script lang="ts">
    import { user } from "../../stores/user";
    import { verificationCodeTimer } from "../../stores/countdown-timer";
    import { api } from "../../api";
    import { FormCard, FormFloating, FormInput, FormSubmit, FormSwitch } from "../common/forms";
    import Modal from "../common/Modal.svelte";

    let showModal: boolean = false;
    let verificationCode: string;

    const handleSendCode = async() => {
        const response = await api.user.generateVerificationCode();
        if (response.statusCode === 201) {
            const lastVerificationCodeDate = new Date(response.data.lastVerificationCodeDate);
            verificationCodeTimer.countDown(new Date(lastVerificationCodeDate.getTime() + 1000 * 60));
        }
    }

    const handleValidateCode = async() => {
        const response = await api.user.validateVerificationCode(verificationCode);
        if (response.statusCode === 200) {
            showModal = false;
            user.setVerified(true);
        }
    }
</script>

<div id="verification" class="mb-5">
    <span>Email Verification</span>
    <hr class="hr my-2" />
    {#if !$user.verified}
        <div class="alert alert-info my-3" role="alert">
            You can simply verify your account by clicking on <span class="badge text-bg-info">Verify Email</span>.
            An email with a 6-digit code will be sent to <span class="badge text-bg-info">{$user.email}</span>
            and all you need to do is rewrite the given code inside a pop-up window that will show.
        </div>
        <FormSwitch id="verified" checked={$user.verified} disabled={true} className="my-4">
            <span>Your account <span class="badge text-bg-info">{$user.email}</span> is not verified</span>
        </FormSwitch>
        <button type="button" class="btn btn-primary" on:click={() => showModal = true}>
            Verify Email
        </button>
        <Modal bind:show={showModal}>
            <span slot="title">Verify Email</span>
            <div slot="body">
                <FormCard on:submit={handleSendCode} className="my-3">
                    <FormSubmit disabled={$verificationCodeTimer === 0 ? false : true}>Get a Verification Code</FormSubmit>
                    {#if $verificationCodeTimer}
                        <div>
                            <span>A new verification code can be generated in {$verificationCodeTimer}
                            {$verificationCodeTimer === 1 ? "second" : "seconds"}</span>
                        </div>
                    {/if}
                </FormCard>
                <FormCard on:submit={handleValidateCode} className="my-3">
                    <FormFloating id="verificationCodeInput" className="mb-3">
                        <FormInput bind:value={verificationCode} placeholder="Enter a 6-digit code" />
                        <span slot="label">Enter a 6-digit code</span>
                    </FormFloating>
                    <FormSubmit dataBsDismiss="modal">Verify & Continue</FormSubmit>
                </FormCard>
            </div>
        </Modal>
    {:else}
        <FormSwitch id="verified" checked={$user.verified} disabled={true} className="my-4">
            <span>Your account <span class="badge text-bg-info">{$user.email}</span> is verified</span>
        </FormSwitch>
    {/if}
</div>
