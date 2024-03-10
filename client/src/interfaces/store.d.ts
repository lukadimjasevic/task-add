declare module "taskadd/store" {
    import type { Writable } from "svelte/store";

    export interface CustomStore extends Writable<T> {
        setValues(values: any): void;
        reset(): void;
    }

    export interface UserStore extends CustomStore {
        setVerified(verified: boolean): void;
        setOtpEnabled(enabled: boolean): void;
        setOtpGenerated(generated: boolean): void;
    }

    export interface UserOTPStore extends CustomStore {
        setToken(token: string): void;
    }
}