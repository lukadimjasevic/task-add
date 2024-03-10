<script lang="ts">
    import { LayoutPage } from "../components/common/layouts";
    import Card from "../components/common/Card.svelte";
    import EmailVerification from "../components/security/email-verification";
    import TwoFactorAuth from "../components/security/two-factor-auth";
</script>

<LayoutPage>
    <Card>
        <span slot="header">Account Security</span>
        <div slot="body">
            <EmailVerification />
            <TwoFactorAuth />
        </div>
    </Card>
</LayoutPage>
