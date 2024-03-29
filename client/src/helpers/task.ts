import type { Task } from "taskadd/task";

const filterTasksByDate = (tasksAll: Task[], dayStart: Date): Task[] => {
    let dayEnd = new Date(dayStart.getTime());
    dayEnd.setHours(23, 59, 59, 999);
    return tasksAll.filter((task: Task) => 
        task.deadlineDate.getTime() >= dayStart.getTime() &&
        task.deadlineDate.getTime() <= dayEnd.getTime()
    );
}

const filterTasksByWeek = (tasksAll: Task[], weekStart: Date): Task[] => {
    let weekEnd = new Date(weekStart.getTime());
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return tasksAll.filter((task: Task) => 
        task.deadlineDate.getTime() >= weekStart.getTime() &&
        task.deadlineDate.getTime() <= weekEnd.getTime()
    );
}

export const task = {
    filterTasksByDate,
    filterTasksByWeek,
}
