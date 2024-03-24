import { writable } from "svelte/store";
import type { CustomStore } from "taskadd/store";

const defaultValues: boolean = false;

const createSidebar = (): CustomStore => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        setValues: (show: boolean) => {
            set(show);
        },
        reset: () => set(false),
    }
}

export const sidebar = createSidebar();
