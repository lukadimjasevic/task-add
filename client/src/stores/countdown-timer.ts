import { writable } from "svelte/store";

const createTimer = () => {
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        set,
        update,
        countDown: (date: Date) => {
            const countInterval = setInterval(() => {
                const now = new Date();
                const diff = date.getTime() - now.getTime();
                const seconds = new Date(diff).getSeconds();

                if (seconds <= 0) {
                    clearInterval(countInterval);
                    set(0);
                } else {
                    set(seconds);
                }
            }, 1000);
        }
    }
}

export const verificationCodeTimer = createTimer();
