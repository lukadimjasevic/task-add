<script lang="ts">
    import { userOTP } from "@stores/user-otp";
    import { auth } from "@stores/auth";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { taskUpcoming } from "@pages/pages";
    import type { UserOTPVerifyDTO } from "taskadd/user-otp";
    import { FormCard, FormSubmit } from "@components/common/forms";
    import Modal from "./Modal.svelte";
    import OTPInput from "@components/settings/security/OTPInput.svelte";

    export let show: boolean;
    export let email: string;
    export let password: string;

    const handleValidateCode = async() => {
        const dto: UserOTPVerifyDTO = { email, password, token: $userOTP.token };
        const response = await api.otp.verify(dto);
        helpers.response.handleResponse(response, "Two-Factor Authentication", async() => {
            show = false;
            auth.setCookie();
            await taskUpcoming.beforeNavigate();
        });
    }
</script>

<Modal bind:show useCloseButtons={false}>
    <span slot="title">Two-Factor Authentication</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span class="d-bloc">
                Enter the six digit code provided by the app
            </span>
        </div>
        <div class="col-12">
            <FormCard on:submit={handleValidateCode} className="my-3 d-flex flex-column gap-3">
                <OTPInput />
                <FormSubmit className="w-100">Verify & Continue</FormSubmit>
            </FormCard>
        </div>
    </div>
</Modal>
