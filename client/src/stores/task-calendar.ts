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
        const computedDate = new Date(date);

        if (selector === "day") {
            computedDate.setDate(computedDate.getDate() + dayOffset);
            return computedDate;
        }

        if (selector === "week") {
            const currentWeek = computedDate.getDate() - computedDate.getDay() + 1;
            computedDate.setDate(currentWeek + 7 * weekOffset);
            return computedDate;
        }

        if (selector === "month") {
            computedDate.setMonth(computedDate.getMonth() + monthOffset);
            computedDate.setDate(1);
            return computedDate;
        }

        return computedDate;
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
