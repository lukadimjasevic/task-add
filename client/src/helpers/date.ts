import type { TaskCalendar } from "taskadd/task-calendar";

const getDefaultDate = (date: Date = new Date()): Date => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

const getDateToString = (date: Date = new Date()): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const getTimeToString = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

const getCalendarLabel = (date: Date, selector: TaskCalendar["selector"]): string => {
    if (selector === "day") {
        return date.toLocaleString("default", { day: "2-digit", month: "long", year: "numeric" });
    }

    if (selector === "week") {
        const weekStart = date;
        const weekEndTime = 6 * 24 * 3600 * 1000;
        const weekEnd = new Date(weekStart.getTime() + weekEndTime);
        return `${weekStart.getDate().toString().padStart(2, "0")}-${weekEnd.getDate().toString().padStart(2, "0")} 
                ${weekStart.toLocaleString("default", { month: "long", year: "numeric" })}`;
    }
    
    if (selector === "month") {
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    }

    return "";
}

export const date = {
    getDefaultDate,
    getDateToString,
    getTimeToString,
    getCalendarLabel,
};
