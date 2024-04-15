<script lang="ts">
    import { userOTP } from "@stores/user-otp";
    import { api } from "@api";
    import Modal from "@components/common/Modal.svelte";

    let showModal: boolean = false;

    const handleEditOTP = async() => {
        const response = await api.otp.get();
        userOTP.setValues(response.data);
        showModal = true;
    }
</script>

<button type="button" class="btn btn-secondary col-lg-3" on:click={handleEditOTP}>
    Edit 2FA
</button>

<Modal bind:show={showModal}>
    <span slot="title">Edit 2FA</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span>Scan this QR code with your authenticator application and enter the code below</span><br/>
        </div>
        <div class="col-12 text-center">
            <img src={$userOTP.qrcode} alt="Auth QR Code"/>
        </div>
    </div>
</Modal>
