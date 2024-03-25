<script lang="ts">
    import { user } from "../../../../stores/user";
    import Enable2FA from "./Enable2FA.svelte";
    import Edit2FA from "./Edit2FA.svelte";
    import Disable2FA from "./Disable2FA.svelte";
</script>

<div id="two-factor-authentication">
    <span>Two-Factor Authentication</span>
    <hr class="hr my-2" />
    {#if !$user.verified}
        <div class="alert alert-info my-3" role="alert">
            <span>To enable Two-Factor Authentication your account
            <b>{$user.email}</b> must be verified first.</span>
        </div>
    {:else}
        {#if !$user.otpEnabled}
            <Enable2FA />
        {:else}
            <Edit2FA />
            <Disable2FA />
        {/if}
    {/if}
</div>
