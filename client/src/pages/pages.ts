import { user } from "../stores/user";
import { tasks } from "../stores/task";
import { api } from "../api";
import { navigate } from "svelte-routing";
import Home from "./Home.svelte";
import Signup from "./Signup.svelte";
import Signin from "./Signin.svelte";
import Signout from "./Signout.svelte";
import Profile from "./Profile.svelte";
import Security from "./Security.svelte";
import TaskDashboard from "./TaskDashboard.svelte";
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

export const signout: Page = {
    name: "Sign out",
    path: "/signout",
    component: Signout,
    protected: true,
    beforeNavigate: async() => {
        navigate(signout.path);
    }
}

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

export const security: Page = {
    name: "Security",
    path: "/security",
    component: Security,
    protected: true,
    beforeNavigate: async() => {
        const responseUser = await api.user.get();
        user.setValues(responseUser.data);
        navigate(security.path);
    },
}

export const taskDashboard: Page = {
    name: "Dashboard",
    path: "/task-dashboard",
    component: TaskDashboard,
    protected: true,
    beforeNavigate: async() => {
        const responseTasks = await api.task.getAll();
        tasks.resetSelected();
        tasks.setValues(responseTasks.data);
        navigate(taskDashboard.path);
    }
}

export const pages = [
    home,
    signup,
    signin,
    signout,
    profile,
    security,
    taskDashboard,
];
