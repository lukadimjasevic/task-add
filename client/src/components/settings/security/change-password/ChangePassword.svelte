<script lang="ts">
    import { api } from "@api";
    import { helpers } from "@helpers";
    import type { UserUpdatePasswordDTO } from "taskadd/user";
    import { FormCard, FormFloating, FormInput, FormSubmit } from "@components/common/forms";

    let passwordOld: string;
    let passwordNew: string;
    let passwordNewConfirm: string;

    const handleChangePassword = async() => {
        const dto: UserUpdatePasswordDTO = { passwordOld, password: passwordNew, passwordRetype: passwordNewConfirm };
        const response = await api.user.updatePassword(dto);
        helpers.response.handleResponse(response, "Profile password update", () => {
            passwordOld = "";
            passwordNew = "";
            passwordNewConfirm = "";
        });
    }
</script>

<div id="change-password">
    <span>Change Password</span>
    <hr class="hr my-2"/>
    <FormCard on:submit={handleChangePassword} className="d-flex flex-column gap-2 row g-0">
        <FormFloating id="oldPassword" className="col-md-6">
            <FormInput bind:value={passwordOld} type="password" placeholder="Old password" />
            <span slot="label">Old password</span>
        </FormFloating>
        <FormFloating id="newPassword" className="col-md-6">
            <FormInput bind:value={passwordNew} type="password" placeholder="New password" />
            <span slot="label">New password</span>
        </FormFloating>
        <FormFloating id="newPasswordConfirm" className="col-md-6">
            <FormInput bind:value={passwordNewConfirm} type="password" placeholder="Confirm new password" />
            <span slot="label">Confirm new password</span>
        </FormFloating>
        <FormSubmit className="col-lg-3">Change password</FormSubmit>
    </FormCard>
</div>
