<script lang="ts">
    import { user } from "../../../stores/user";
    import EmailNotVerified from "./EmailNotVerified.svelte";
    import EmailVerify from "./EmailVerify.svelte";
    import EmailVerified from "./EmailVerified.svelte";
</script>

<div id="verification" class="mb-5">
    <span>Email Verification</span>
    <hr class="hr my-2" />
    {#if !$user.verified}
        <EmailNotVerified />
        <EmailVerify />
    {:else}
        <EmailVerified />
    {/if}
</div>
