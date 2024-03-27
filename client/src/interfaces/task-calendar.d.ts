declare module "taskadd/task-calendar" {
    export interface TaskCalendarDates {
        dateDay: Date; // Current day
        dateWeek: Date; // Start of the week
        dateMonth: Date; // Start of the month
    }

    export interface TaskCalendar extends TaskCalendarDates {
        selector: "day" | "week" | "month";
        labelDay: string;
        labelWeek: string;
        labelMonth: string;
    }

    export interface TaskCalendarOffset {
        dayOffset?: number;
        weekOffset?: number;
        monthOffset?: number;
    }
}
