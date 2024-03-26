import { user } from "@stores/user";
import { tasks } from "@stores/task";
import { api } from "@api";
import { navigate } from "svelte-routing";
import Home from "./Home.svelte";
import Signup from "./Signup.svelte";
import Signin from "./Signin.svelte";
import Signout from "./Signout.svelte";
import TaskUpcoming from "./TaskUpcoming.svelte";
import TaskToday from "./TaskToday.svelte";
import Settings from "./Settings.svelte";
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

export const taskUpcoming: Page = {
    name: "Upcoming",
    path: "/task-upcoming",
    component: TaskUpcoming,
    protected: true,
    beforeNavigate: async() => {
        const responseTasks = await api.task.getAll();
        tasks.resetSelected();
        tasks.setValues(responseTasks.data);
        navigate(taskUpcoming.path);
    }
}

export const taskToday: Page = {
    name: "Today",
    path: "/task-today",
    component: TaskToday,
    protected: true,
    beforeNavigate: async() => {
        const responseTasks = await api.task.getAll();
        tasks.resetSelected();
        tasks.setValues(responseTasks.data);
        navigate(taskToday.path);
    }
}

export const settings: Page = {
    name: "Settings",
    path: "/settings",
    component: Settings,
    protected: true,
    beforeNavigate: async() => {
        const responseUser = await api.user.get();
        user.setValues(responseUser.data);
        navigate(settings.path);
    }
}

export const pages = [
    home,
    signup,
    signin,
    signout,
    taskUpcoming,
    taskToday,
    settings,
];
