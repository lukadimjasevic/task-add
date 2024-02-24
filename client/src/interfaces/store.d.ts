declare module "taskadd/store" {
    import type { Writable } from "svelte/store";

    export interface CustomStore extends Writable<T> {
        setValues(values: any): void;
        reset(): void;
    }
}