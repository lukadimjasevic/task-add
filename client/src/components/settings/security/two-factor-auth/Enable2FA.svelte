<script lang="ts">
    import { user } from "@stores/user";
    import { userOTP } from "@stores/user-otp";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { FormCard, FormSubmit } from "@components/common/forms";
    import Modal from "@components/common/Modal.svelte";
    import OTPInput from "@components/settings/security/OTPInput.svelte";

    let showModal: boolean = false;

    const handleGenerateOTP = async() => {
        if ($user.otpGenerated) {
            const response = await api.otp.get();
            if (response.statusCode === 200) {
                userOTP.setValues(response.data);
                showModal = true;
            }
            return;
        }
        const response = await api.otp.generate();
        if (response.statusCode === 201) {
            user.setOtpGenerated(true);
            userOTP.setValues(response.data);
            showModal = true;
        }
    }

    const handleEnableOTP = async() => {
        const response = await api.otp.enable($userOTP.token);
        helpers.response.handleResponse(response, "Enable 2FA", () => {
            showModal = false;
            user.setOtpEnabled(true);
        });
    }
</script>

<button type="button" class="btn btn-secondary col-lg-3" on:click={handleGenerateOTP}>
    Enable 2FA
</button>

<Modal bind:show={showModal}>
    <span slot="title">Enable 2FA</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span>Scan this QR code with your authenticator application and enter the six digit code below</span><br/>
        </div>
        <div class="col-12 text-center">
            <img src={$userOTP.qrcode} alt="Auth QR Code"/>
        </div>
        <div class="col-12">
            <FormCard on:submit={handleEnableOTP} className="d-flex flex-column gap-3">
                <OTPInput />
                <FormSubmit className="w-100">Verify & Continue</FormSubmit>
            </FormCard>
        </div>
    </div>
</Modal>
