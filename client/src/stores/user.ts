import { writable } from "svelte/store";
import type { User } from "taskadd/user";
import type { CustomStore } from "taskadd/store";

const defaultValues: User = {
    avatar: null,
    email: null,
    firstname: null,
    lastname: null,
    username: null,
    verified: null,
};

const createUser = (): CustomStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        setValues: (values) => {
            const data = {
                avatar: values.avatar,
                email: values.email, 
                firstname: values.firstname, 
                lastname: values.lastname,
                username: values.username,
                verified: values.verified,
            };
            set(data);
        },
        reset: () => set(defaultValues),
    }
}

export const user = createUser();