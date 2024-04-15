<script lang="ts">
    import { user } from "@stores/user";
    import { auth } from "@stores/auth";
    import { calendar } from "@stores/task-calendar";
    import { taskCategories } from "@stores/task-category";
    import { taskStatuses } from "@stores/task-status";
    import { tasks } from "@stores/task";
    import { userOTP } from "@stores/user-otp";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { home } from "@pages/pages";
    import Modal from "@components/common/Modal.svelte";

    let show: boolean = false;

    const handleDeleteAccount = async() => {
        const response = await api.user.remove();
        helpers.response.handleResponse(response, "Delete account", async() => {
            calendar.reset();
            taskCategories.reset();
            taskStatuses.reset();
            tasks.reset();
            userOTP.reset();
            user.reset();
            auth.reset();
            show = false;
            await home.beforeNavigate();
        });
    }
</script>

<button type="button" class="btn btn-outline-danger col-lg-3" on:click={() => show = true}>
    Delete account
</button>

<Modal bind:show>
    <span slot="title">Delete account</span>
    <div slot="body" class="row text-start fw-normal">
        <div class="col-12">
            <span>Are you sure you want to delete account <b>{$user.email}</b> ?</span>
        </div>
    </div>
    <div slot="footer">
        <button type="button" class="btn btn-danger" on:click={handleDeleteAccount}>
            Delete
        </button>
    </div>
</Modal>
