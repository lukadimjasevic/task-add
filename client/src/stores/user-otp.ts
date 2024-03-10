import { writable } from "svelte/store";
import type { UserOTP } from "taskadd/user-otp";
import type { UserOTPStore } from "taskadd/store";

const defaultValues: UserOTP = {
    qrcode: null,
    token: null,
}

const createUserOTP = (): UserOTPStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        setValues: (values: UserOTP) => {
            const data: UserOTP = {
                qrcode: values.qrcode,
                token: null,
            }
            set(data);
        },
        setToken: (token: string) => {
            update((current: UserOTP) => current = { ...current, token });
        },
        reset: () => set(defaultValues),
    }
}

export const userOTP = createUserOTP();
