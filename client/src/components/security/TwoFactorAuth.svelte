<script lang="ts">
    import { user } from "../../stores/user";
    import { userOTP } from "../../stores/user-otp";
    import { api } from "../../api";
    import FormCard from "../FormCard.svelte";
    import FormSubmit from "../FormSubmit.svelte";
    import OTPInput from "../OTPInput.svelte";
    import Modal from "../Modal.svelte";

    let showModal: boolean = false;

    const handleGenerateOTP = async() => {
        showModal = true;
        if ($user.otpGenerated) {
            handleEditOTP();
            return;
        }
        const response = await api.otp.generate();
        if (response.statusCode === 201) {
            user.setOtpGenerated(true);
            userOTP.setValues(response.data);
        }
    }

    const handleEnableOTP = async() => {
        if ($user.otpEnabled) {
            return;
        }
        
        const response = await api.otp.enable($userOTP.token);
        if (response.statusCode === 201) {
            showModal = false;
            user.setOtpEnabled(true);
        }
    }

    const handleEditOTP = async() => {
        showModal = true;
        const response = await api.otp.get();
        if (response.statusCode === 200) {
            userOTP.setValues(response.data);
        }
    }
</script>

<div id="two-factor-authentication">
    <span>Two-Factor Authentication</span>
    <hr class="hr my-2" />
    {#if !$user.verified}
        <div class="alert alert-info my-3" role="alert">
            <span>To enable Two-Factor Authentication your account
            <span class="badge text-bg-info">{$user.email}</span> must be verified first.</span>
        </div>
    {:else}
        {#if !$user.otpEnabled}
            <button type="button" class="btn btn-primary" on:click={handleGenerateOTP}>
                Enable 2FA
            </button>
        {:else}
            <button type="button" class="btn btn-primary" on:click={handleEditOTP}>
                Edit 2FA
            </button>
        {/if}

        <Modal bind:show={showModal}>
            <span slot="title">
                {#if !$user.otpEnabled}
                    Enable 2FA
                {:else}
                    Edit 2FA
                {/if}
            </span>
            
            <div slot="body" class="row">
                {#if $userOTP.qrcode}
                    <div class="col-12">
                        <span>Scan this QR code with your authenticator application and enter the code below</span><br/>
                    </div>
                    <div class="col-12 text-center">
                        <img src={$userOTP.qrcode} alt="Auth QR Code"/>
                    </div>
                    {#if !$user.otpEnabled}
                        <div class="col-12">
                            <FormCard onSubmit={handleEnableOTP}>
                                <OTPInput />
                                <FormSubmit className="w-100">Verify & Continue</FormSubmit>
                            </FormCard>
                        </div>
                    {/if}
                {/if}
            </div>
        </Modal>
    {/if}
</div>
