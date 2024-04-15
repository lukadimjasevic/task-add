import { writable, get } from "svelte/store";
import type { ToastStore } from "taskadd/store";
import type { Toast, ToastOptions } from "taskadd/toast";

const defaultValues: Toast[] = [];

const createToasts = (): ToastStore => {
    const { subscribe, set, update } = writable(defaultValues);

    const updateToast = (type: Toast["type"], title: Toast["title"], description: Toast["description"], options?: ToastOptions): Toast => {
        return {
            uuid: crypto.randomUUID(),
            type,
            title,
            description,
            duration: options && options.duration ? options.duration : 2000,
            ...options,
        }
    }

    return {
        subscribe, 
        set, 
        update,
        add: (type: Toast["type"], title: Toast["title"], description: Toast["description"] = "", options: ToastOptions) => {
            update((current: Toast[]) => current = [
                ...current,
                updateToast(type, title, description, options),
            ]);
        },
        remove: (toast: Toast) => {
            update((current: Toast[]) => current.filter((currentToast: Toast) => currentToast.uuid !== toast.uuid));
        },
        success: (title: Toast["title"], description: Toast["description"], options?: ToastOptions) => {
            update((current: Toast[]) => current = [
                ...current,
                updateToast("success", title, description, options),
            ]);
        },
        error: (title: Toast["title"], description: Toast["description"], options?: ToastOptions) => {
            update((current: Toast[]) => current = [
                ...current,
                updateToast("error", title, description, options),
            ]);
        },
    }
}

export const toasts = createToasts();
