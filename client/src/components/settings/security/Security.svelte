<script lang="ts">
    import Card from "@components/common/Card.svelte";
    import ChangePassword from "./change-password/ChangePassword.svelte";
    import TwoFactorAuth from "@components/settings/security/two-factor-auth";
</script>

<Card>
    <span slot="header">Account Security</span>
    <div slot="body" class="d-flex flex-column gap-4">
        <ChangePassword />
        <TwoFactorAuth />
    </div>
</Card>
