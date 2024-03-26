<script lang="ts">
    import Card from "@components/common/Card.svelte";
    import EmailVerification from "@components/settings/security/email-verification";
    import TwoFactorAuth from "@components/settings/security/two-factor-auth";
</script>

<Card>
    <span slot="header">Account Security</span>
    <div slot="body">
        <EmailVerification />
        <TwoFactorAuth />
    </div>
</Card>
