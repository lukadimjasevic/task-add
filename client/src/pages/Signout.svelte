<script lang="ts">
    import { user } from "@stores/user";
    import { userOTP } from "@stores/user-otp";
    import { auth } from "@stores/auth";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import { navigate } from "svelte-routing";
    import { home } from "@pages/pages";
    import Card from "@components/common/Card.svelte";

    const handleSignOut = async() => {
        const response = await api.auth.signout();
        helpers.response.handleResponse(response, "Sign out", () => {
            user.reset();
            userOTP.reset();
            auth.reset();
            navigate(home.path);
        });
    }
</script>

<Card>
    <span slot="header">Sign Out</span>
    <div slot="body" class="row">
        <div class="col-12">
            <span>Are you sure you want to sign out?</span>
        </div>
        <div class="col-12 text-end">
            <button type="button" class="btn btn-danger" on:click={handleSignOut}>
                Sign Out
            </button>
        </div>
    </div>
</Card>
