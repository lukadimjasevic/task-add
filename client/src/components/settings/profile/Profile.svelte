<script lang="ts">
    import { user } from "@stores/user";
    import { api } from "@api";
    import { helpers } from "@helpers";
    import Card from "@components/common/Card.svelte";
    import { FormCard, FormFloating, FormInput, FormFile, FormSubmit } from "@components/common/forms";
    import ProfileDelete from "@components/settings/profile/ProfileDelete.svelte";

    let avatar: File | null = null;
    let avatarUrl: string | null = $user.avatar ? `data:image/jpg;base64,${$user.avatar}` : null;
    let firstname: string = $user.firstname ? $user.firstname : null;
    let lastname: string = $user.lastname ? $user.lastname : null;

    const handleUpdate = async() => {
        const response = await api.user.update(avatar, firstname, lastname);
        helpers.response.handleResponse(response, "Profile update", () => {
            user.setValues(response.data);
        });
    }

    const handleAvatarChange = (event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files) {
            avatar = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result) {
                    avatarUrl = result.toString();
                }
            }
            reader.readAsDataURL(avatar);
        }
    }

    const handleAvatarRemove = () => {
        avatar = null;
        avatarUrl = null;
    }

</script>

<Card>
    <span slot="header">Account Profile</span>
    <div slot="body">
        <FormCard on:submit={handleUpdate} className="d-flex flex-column gap-2">
            <div class="row g-2">
                <div class="col-md-6 d-flex flex-column gap-2">
                    <FormFloating id="firstname">
                        <FormInput bind:value={firstname} placeholder="Firstname" />
                        <span slot="label">Firstname</span>
                    </FormFloating>
                    <FormFloating id="lastname">
                        <FormInput bind:value={lastname} placeholder="Lastname" />
                        <span slot="label">Lastname</span>
                    </FormFloating>
                </div>
                <div class="col-md-6">
                    <FormFile on:change={(event) => handleAvatarChange(event)} className="h-100 w-100">
                        {#if !avatarUrl} 
                            <div class="bi bi-person-circle" style="font-size: 5rem"/>
                        {:else}
                            <img src={avatarUrl} alt="Profile"/>
                        {/if}
                    </FormFile>
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger col-lg-3" on:click={handleAvatarRemove}>
                Remove photo
            </button>
            <ProfileDelete/>
            <FormSubmit className="col-lg-3">Save profile</FormSubmit>
        </FormCard>
    </div>
</Card>

<style>
    img {
        width: 100px;
        max-width: 100px;
        border-radius: 100%;
    }
</style>
