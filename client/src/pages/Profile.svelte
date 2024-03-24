<script lang="ts">
    import { user } from "../stores/user";
    import { api } from "../api";
    import Card from "../components/common/Card.svelte";
    import { FormCard, FormFloating, FormInput, FormFile, FormSubmit } from "../components/common/forms"

    let avatar: File | null = null;
    let avatarUrl: string | null = $user.avatar ? `data:image/jpg;base64,${$user.avatar}` : null;
    let firstname: string = $user.firstname ? $user.firstname : null;
    let lastname: string = $user.lastname ? $user.lastname : null;

    const handleUpdate = async() => {
        const response = await api.user.update(avatar, firstname, lastname);
        if (response.statusCode === 200) {
            user.setValues(response.data);
        }
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
        <FormCard on:submit={handleUpdate} className="row g-2 m-0">
            <div class="col-md-4 d-flex flex-column text-center mb-3">
                <FormFile on:change={(event) => handleAvatarChange(event)}>
                    {#if !avatarUrl} 
                        <div class="bi bi-person-circle" style="font-size: 100px" />
                    {:else}
                        <img src={avatarUrl} alt="Profile" />
                    {/if}
                </FormFile>
                <button type="button" class="btn btn-danger" on:click={handleAvatarRemove}>Remove</button>
            </div>
            <div class="col-md-8 d-flex flex-column justify-content-center gap-3 mb-3">
                <FormFloating id="firstname">
                    <FormInput bind:value={firstname} placeholder="Firstname" />
                    <span slot="label">Firstname</span>
                </FormFloating>
                <FormFloating id="lastname">
                    <FormInput bind:value={lastname} placeholder="Lastname" />
                    <span slot="label">Lastname</span>
                </FormFloating>
            </div>
            <FormSubmit>Update Profile</FormSubmit>
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
