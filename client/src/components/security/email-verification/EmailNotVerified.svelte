<script lang="ts">
    import { user } from "../../../stores/user";
    import { FormSwitch } from "../../common/forms";
</script>

<div class="alert alert-info my-3" role="alert">
    You can simply verify your account by clicking on <span class="badge text-bg-info">Verify Email</span>.
    An email with a 6-digit code will be sent to <b>{$user.email}</b>
    and all you need to do is rewrite the given code inside a pop-up window that will show.
</div>

<FormSwitch id="verified" checked={$user.verified} disabled={true} className="my-4">
    <span>Your account <b>{$user.email}</b> is not verified</span>
</FormSwitch>
