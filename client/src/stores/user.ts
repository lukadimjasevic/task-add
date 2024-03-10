import { writable } from "svelte/store";
import type { User } from "taskadd/user";
import type { UserStore } from "taskadd/store";

const defaultValues: User = {
    avatar: null,
    email: null,
    firstname: null,
    lastname: null,
    username: null,
    verified: null,
    otpEnabled: null,
    otpGenerated: null,
};

const createUser = (): UserStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        setValues: (values: User) => {
            const data: User = {
                avatar: values.avatar,
                email: values.email, 
                firstname: values.firstname, 
                lastname: values.lastname,
                username: values.username,
                verified: values.verified,
                otpEnabled: values.otpEnabled,
                otpGenerated: values.otpGenerated,
            };
            set(data);
        },
        setVerified: (verified: boolean) => {
            update((current: User) => current = { ...current, verified });
        },
        setOtpEnabled: (otpEnabled: boolean) => {
            update((current: User) => current = { ...current, otpEnabled });
        },
        setOtpGenerated: (otpGenerated: boolean) => {
            update((current: User) => current = { ...current, otpGenerated });
        },
        reset: () => set(defaultValues),
    }
}

export const user = createUser();
