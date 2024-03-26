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

export const date = {
    getDefaultDate,
    getDateToString,
    getTimeToString,
};
