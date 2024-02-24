<script lang="ts">
    import { auth } from "../stores/auth";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { api } from "../api";
    import { home } from "./pages";
    import FormCard from "../components/FormCard.svelte";
    import FormInput from "../components/FormInput.svelte";
    import FormSubmit from "../components/FormSubmit.svelte";

    onMount(() => {
        if ($auth.cookie) {
            navigate(home.path);
        }
    });

    let email: string;
    let password: string;

    const signin = async() => {
        const response = await api.auth.signIn(email, password);
        if (response.statusCode === 200) {
            auth.setCookie();
            navigate(home.path);
        }
    }
</script>

<div class="d-flex flex-column justify-content-center align-items-center">
    <h2 class="col-md-4 text-center">Sign In</h2>
    <FormCard className="col-md-4 m-4" onSubmit={signin}>
        <FormInput bind:value={email} type="email" placeholder="Email" required={true} />
        <FormInput bind:value={password} type="password" placeholder="Password" required={true} />
        <FormSubmit className="btn-block w-100 mt-2">Sign In</FormSubmit>
    </FormCard>
</div>
