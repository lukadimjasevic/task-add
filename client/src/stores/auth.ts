import { writable } from "svelte/store";

const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const createAuth = () => {
    const { subscribe, set, update } = writable({ cookie: getCookie("task_add_session_id") });

    return {
        subscribe,
        setCookie: () => set({ cookie: getCookie("task_add_session_id") }),
        reset: () => set({ cookie: "" }),
    }
}

export const auth = createAuth();
