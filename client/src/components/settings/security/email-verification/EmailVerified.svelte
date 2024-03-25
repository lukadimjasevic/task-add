<script lang="ts">
    import { user } from "../../../../stores/user";
    import { FormSwitch } from "../../../common/forms";
</script>

<FormSwitch id="verified" checked={$user.verified} disabled={true} className="my-4">
    <span>Your account <b>{$user.email}</b> is verified</span>
</FormSwitch>
