import { writable } from "svelte/store";

interface Timer {
    isRunning: boolean;
    value: number;
}

const defaultValues: Timer = {
    isRunning: false,
    value: 0,
}

const createTimer = () => {
    const { subscribe, set, update } = writable(defaultValues);

    return {
        subscribe,
        set,
        update,
        countDown: (date: Date) => {
            let updateFlag = true;
            const countInterval = setInterval(() => {
                if (updateFlag) {
                    update((current: Timer) => current = { ...current, isRunning: true });
                    updateFlag = false;
                }
                
                const now = new Date();
                const diff = date.getTime() - now.getTime();
                const seconds = new Date(diff).getSeconds();

                if (seconds <= 0) {
                    clearInterval(countInterval);
                    set(defaultValues);
                } else {
                    update((current: Timer) => current = { ...current, value: seconds });
                }
            }, 1000);
        }
    }
}

export const verificationCodeTimer = createTimer();
