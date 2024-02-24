<script lang="ts">
    import { auth } from "../stores/auth";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { api } from "../api";
    import { signin, home } from "../pages/pages";
    import FormInput from "../components/FormInput.svelte";
    import FormCard from "../components/FormCard.svelte";
    import FormSubmit from "../components/FormSubmit.svelte";

    onMount(() => {
        if ($auth.cookie) {
            navigate(home.path);
        }
    });

    let email: string;
    let username: string;
    let password: string;
    let passwordRetype: string;

    const signup = async() => {
        const response = await api.auth.signUp(email, username, password, passwordRetype);
        if (response.statusCode === 201) {
            navigate(signin.path);
        }
    };
</script>

<div class="d-flex flex-column justify-content-center align-items-center">
    <h2 class="col-md-4 text-center">Sign Up - Create Account</h2>
    <FormCard className="col-md-4 m-4" onSubmit={signup}>
        <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
        <FormInput bind:value={username} placeholder="Username" required={true} />
        <FormInput bind:value={password} type="password" placeholder="Create password" required={true} />
        <FormInput bind:value={passwordRetype} type="password" placeholder="Confirm password" required={true} />
        <FormSubmit className="btn-block w-100 mt-2">Sign Up</FormSubmit>
    </FormCard>
</div>
