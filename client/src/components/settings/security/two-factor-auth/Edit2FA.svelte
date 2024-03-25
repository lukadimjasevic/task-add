<script lang="ts">
    import { userOTP } from "../../../../stores/user-otp";
    import { api } from "../../../../api";
    import Modal from "../../../common/Modal.svelte";

    let showModal: boolean = false;

    const handleEditOTP = async() => {
        const response = await api.otp.get();
        if (response.statusCode === 200) {
            userOTP.setValues(response.data);
            showModal = true;
        }
    }
</script>

<button type="button" class="btn btn-primary" on:click={handleEditOTP}>
    Edit 2FA
</button>

<Modal bind:show={showModal}>
    <span slot="title">Enable 2FA</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span>Scan this QR code with your authenticator application and enter the code below</span><br/>
        </div>
        <div class="col-12 text-center">
            <img src={$userOTP.qrcode} alt="Auth QR Code"/>
        </div>
    </div>
</Modal>
