<script lang="ts">
    import Card from "../../common/Card.svelte";
    import EmailVerification from "../security/email-verification";
    import TwoFactorAuth from "../security/two-factor-auth";
</script>

<Card>
    <span slot="header">Account Security</span>
    <div slot="body">
        <EmailVerification />
        <TwoFactorAuth />
    </div>
</Card>
