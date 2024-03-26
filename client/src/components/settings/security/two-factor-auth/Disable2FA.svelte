<script lang="ts">
    import { user } from "@stores/user";
    import { api } from "@api";
    import Modal from "@components/common/Modal.svelte";

    let showModal: boolean = false;

    const handleDisableOTP = async() => {
        const response = await api.otp.disable();
        if (response.statusCode === 200) {
            showModal = false;
            user.setOtpEnabled(false);
            user.setOtpGenerated(false);
        }
    }
</script>

<button type="button" class="btn btn-outline-danger" on:click={() => showModal = true}>
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
