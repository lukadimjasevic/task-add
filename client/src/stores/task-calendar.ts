import { writable, get } from "svelte/store";
import type { TaskCalendarStore } from "taskadd/store";
import type { TaskCalendar, TaskCalendarOffset } from "taskadd/task-calendar";
import { helpers } from "@helpers";

const defaultDateDay = new Date();
defaultDateDay.setHours(0, 0, 0, 0);

const defaultValues: TaskCalendar = {
    selector: "day",
    date: defaultDateDay,
    label: helpers.date.getCalendarLabel(defaultDateDay, "day"),
};

const createCalendar = (): TaskCalendarStore => {
    const { subscribe, set, update } = writable(defaultValues);

    const computeSelectorDate = (selector: TaskCalendar["selector"], { dayOffset = 0, weekOffset = 0, monthOffset = 0}: TaskCalendarOffset = {}): Date => {
        const calendarData: TaskCalendar = get(calendar);
        let { date } = calendarData;

        if (selector === "day") {
            date.setDate(date.getDate() + dayOffset);
        }

        if (selector === "week") {
            const currentWeek = date.getDate() - date.getDay() + 1;
            date.setDate(currentWeek + 7 * weekOffset);
        }

        if (selector === "month") {
            date.setMonth(date.getMonth() + monthOffset);
            date.setDate(1);
        }

        return date;
    }

    return {
        subscribe,
        set,
        update,
        setValues: (selector: TaskCalendar["selector"]) => {
            const date = computeSelectorDate(selector);
            set({
                selector,
                date,
                label: helpers.date.getCalendarLabel(date, selector)
            });
        },
        toggleDate: (offset: number) => {
        const { selector }: TaskCalendar = get(calendar);
            const date: Date = computeSelectorDate(selector, { dayOffset: offset, weekOffset: offset, monthOffset: offset });;
            update((current: TaskCalendar) => current = {
                ...current,
                date,
                label: helpers.date.getCalendarLabel(date, selector),
            });
        },
        reset: () => set(defaultValues),
    }
}

export const calendar = createCalendar();
