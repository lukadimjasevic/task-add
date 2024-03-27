import { writable, get } from "svelte/store";
import type { TaskCalendarStore } from "taskadd/store";
import type { TaskCalendar, TaskCalendarOffset, TaskCalendarDates } from "taskadd/task-calendar";
import { helpers } from "@helpers";

const defaultDateDay = new Date();
const defaultDateWeek = new Date(defaultDateDay.getFullYear(), defaultDateDay.getMonth(), defaultDateDay.getDate() - defaultDateDay.getDay() + 1);
const defaultDateMonth = new Date(new Date().setDate(1));

const defaultValues: TaskCalendar = {
    selector: "day",
    dateDay: defaultDateDay,
    dateWeek: defaultDateWeek,
    dateMonth: defaultDateMonth,
    labelDay: helpers.date.getCalendarLabel(defaultDateDay, "day"),
    labelWeek: helpers.date.getCalendarLabel(defaultDateWeek, "week"),
    labelMonth: helpers.date.getCalendarLabel(defaultDateMonth, "month"),
};

const createCalendar = (): TaskCalendarStore => {
    const { subscribe, set, update } = writable(defaultValues);

    const computeSelectorDate = (selector: TaskCalendar["selector"], { dayOffset = 0, weekOffset = 0, monthOffset = 0}: TaskCalendarOffset = {}): TaskCalendarDates => {
        const calendarData: TaskCalendar = get(calendar);
        let { dateDay, dateWeek, dateMonth } = calendarData;

        if (selector === "day") {
            dateDay.setDate(dateDay.getDate() + dayOffset);
        }

        if (selector === "week") {
            const currentWeek = dateWeek.getDate() - dateWeek.getDay() + 1;
            dateWeek.setDate(currentWeek + 7 * weekOffset);
        }

        if (selector === "month") {
            dateMonth.setMonth(dateMonth.getMonth() + monthOffset);
        }

        return { dateDay, dateWeek, dateMonth };
    }

    return {
        subscribe,
        set,
        update,
        setValues: (selector: TaskCalendar["selector"]) => {
            let { dateDay, dateWeek, dateMonth } = computeSelectorDate(selector);
            set({
                selector,
                dateDay,
                dateWeek,
                dateMonth,
                labelDay: helpers.date.getCalendarLabel(dateDay, "day"),
                labelWeek: helpers.date.getCalendarLabel(dateWeek, "week"),
                labelMonth: helpers.date.getCalendarLabel(dateMonth, "month"),
            });
        },
        toggleDate: (offset: number) => {
            let { selector, dateDay, dateWeek, dateMonth }: TaskCalendar = get(calendar);
            let computedDates: TaskCalendarDates = { dateDay: defaultDateDay, dateWeek: defaultDateWeek, dateMonth: defaultDateMonth };
            if (selector === "day") {
                computedDates = computeSelectorDate(selector, { dayOffset: offset });
            }
            if (selector === "week") {
                computedDates = computeSelectorDate(selector, { weekOffset: offset });
            }
            if (selector === "month") {
                computedDates = computeSelectorDate(selector, { monthOffset: offset });
            }
            update((current: TaskCalendar) => current = {
                ...current,
                dateDay: computedDates.dateDay,
                dateWeek: computedDates.dateWeek,
                dateMonth: computedDates.dateMonth,
                labelDay: helpers.date.getCalendarLabel(dateDay, "day"),
                labelWeek: helpers.date.getCalendarLabel(dateWeek, "week"),
                labelMonth: helpers.date.getCalendarLabel(dateMonth, "month"),
            });
        },
        reset: () => set(defaultValues),
    }
}

export const calendar = createCalendar();
