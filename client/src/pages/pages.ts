import { user } from "@stores/user";
import { tasks } from "@stores/task";
import { taskCategories } from "@stores/task-category";
import { api } from "@api";
import { navigate } from "svelte-routing";
import Home from "@pages/Home.svelte";
import Signup from "@pages/Signup.svelte";
import Signin from "@pages/Signin.svelte";
import Signout from "@pages/Signout.svelte";
import TaskUpcoming from "@pages/TaskUpcoming.svelte";
import TaskToday from "@pages/TaskToday.svelte";
import TaskCalendar from "@pages/TaskCalendar.svelte";
import TaskCategory from "@pages/TaskCategory.svelte";
import Settings from "./Settings.svelte";
import type { Page, NavigateOptions } from "taskadd/page";

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

export const taskCalendar: Page = {
    name: "Calendar",
    path: "/task-calendar",
    component: TaskCalendar,
    protected: true,
    beforeNavigate: async() => {
        const responseTasks = await api.task.getAll();
        tasks.resetSelected();
        tasks.setValues(responseTasks.data);
        navigate(taskCalendar.path);
    }
}

export const taskCategory: Page = {
    name: "Task Category",
    path: "/task-category/:categoryId",
    component: TaskCategory,
    protected: true,
    beforeNavigate: async(options: NavigateOptions) => {
        const responseTasks = await api.task.getAll();
        tasks.resetSelected();
        tasks.setValues(responseTasks.data);
        const responseTaskCategories = await api.category.getAll();
        taskCategories.setValues(responseTaskCategories.data, responseTasks.data);
        const route = taskCategory.path.replace(":categoryId", options.params);
        navigate(route);
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
    taskCalendar,
    taskCategory,
    settings,
];
