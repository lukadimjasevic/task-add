import { user } from "../stores/user";
import { api } from "../api";
import { navigate } from "svelte-routing";
import Home from "./Home.svelte";
import Signup from "./Signup.svelte";
import Signin from "./Signin.svelte";
import Profile from "./Profile.svelte";
import type { Page } from "taskadd/page";

export const home: Page = {
    name: "TaskAdd",
    path: "/",
    component: Home,
    protected: false,
    beforeNavigate: async() => {
        navigate(home.path);
    },
};

export const signup: Page = {
    name: "Sign up",
    path: "/signup",
    component: Signup,
    protected: false,
    beforeNavigate: async() => {
        navigate(signup.path);
    },
};

export const signin: Page = {
    name: "Sign in",
    path: "/signin",
    component: Signin,
    protected: false,
    beforeNavigate: async() => {
        navigate(signin.path);
    },
};

export const profile: Page = {
    name: "Profile",
    path: "/profile",
    component: Profile,
    protected: true,
    beforeNavigate: async() => {
        const response = await api.user.get();
        user.setValues(response.data);
        navigate(profile.path);
    },
}

export const pages = [
    home,
    signup,
    signin,
    profile,
];
