<script lang="ts">
    import { user } from "@stores/user";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import Modal from "@components/common/Modal.svelte";

    let showModal: boolean = false;

    const handleDisableOTP = async() => {
        const response = await api.otp.disable();
        helpers.response.handleResponse(response, "Disable 2FA", () => {
            user.setOtpEnabled(false);
            user.setOtpGenerated(false);
            showModal = false;
        });
    }
</script>

<button type="button" class="btn btn-outline-danger col-lg-3" on:click={() => showModal = true}>
    Disable 2FA
</button>

<Modal bind:show={showModal}>
    <span slot="title">Disable 2FA</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span>Are you sure you want to disable Two-Factor-Authentication (2FA)?</span>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn btn-danger" on:click={handleDisableOTP}>
            Disable
        </button>
    </div>
</Modal>
