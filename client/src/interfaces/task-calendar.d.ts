declare module "taskadd/task-calendar" {
    export interface TaskCalendar extends TaskCalendarDates {
        selector: "day" | "week" | "month";
        date: Date;
        label: string;
    }

    export interface TaskCalendarOffset {
        dayOffset?: number;
        weekOffset?: number;
        monthOffset?: number;
    }
}
