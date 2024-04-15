import type { Task } from "taskadd/task";
import type { TaskCategory } from "taskadd/task-category";

const filterTasksToday = (tasks: Task[]) => {
    const todayStart = new Date();
    const todayEnd = new Date();
    todayStart.setHours(0, 0, 0, 0);
    todayEnd.setHours(23, 59, 59, 999);
    const tasksToday = tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= todayStart.getTime() &&
        task.deadlineDate.getTime() < todayEnd.getTime()
    );
    return { count: tasksToday.length, tasksToday };
}

const filterTasksTomorrow = (tasks: Task[]) => {
    const tomorrowStart = new Date();
    const tomorrowEnd = new Date();
    tomorrowStart.setHours(24, 0, 0, 0);
    tomorrowEnd.setHours(47, 59, 59, 999);
    const tasksTomorrow = tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= tomorrowStart.getTime() &&
        task.deadlineDate.getTime() < tomorrowEnd.getTime()
    );
    return { count: tasksTomorrow.length, tasksTomorrow };
}

const filterTasksWeek = (tasks: Task[]) => {
    const weekStart = new Date();
    const weekEnd = new Date();
    weekStart.setHours(48, 0, 0, 0);
    weekEnd.setHours(167, 59, 59, 999);
    const tasksWeek = tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= weekStart.getTime() &&
        task.deadlineDate.getTime() < weekEnd.getTime()
    );
    return { count: tasksWeek.length, tasksWeek };
}

const filterTasksFuture = (tasks: Task[]) => {
    const futureStart = new Date();
    futureStart.setHours(168, 0, 0, 0);
    const tasksFuture = tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= futureStart.getTime()
    );
    return { count: tasksFuture.length, tasksFuture };
}

const filterTasksByDate = (tasks: Task[], dayStart: Date): Task[] => {
    let dayEnd = new Date(dayStart.getTime());
    dayEnd.setHours(23, 59, 59, 999);
    return tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= dayStart.getTime() &&
        task.deadlineDate.getTime() <= dayEnd.getTime()
    );
}

const filterTasksByWeek = (tasks: Task[], weekStart: Date): Task[] => {
    let weekEnd = new Date(weekStart.getTime());
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return tasks.filter((task: Task) => 
        task.deadlineDate.getTime() >= weekStart.getTime() &&
        task.deadlineDate.getTime() <= weekEnd.getTime()
    );
}

const filterTasksByCategory = (tasks: Task[], category: TaskCategory): Task[] => {
    const tasksByCategory: Task[] = [];
    tasks.forEach((task: Task) => {
        task.categories.forEach((taskCategory: TaskCategory) => {
            if (taskCategory.id === category.id) tasksByCategory.push(task);
        });
    });
    return tasksByCategory;
}

const filterTasksBySelected = (tasks: Task[]) => {
    return tasks.filter((task: Task) => task.selected);
}

export const task = {
    filterTasksToday,
    filterTasksTomorrow,
    filterTasksWeek,
    filterTasksFuture,
    filterTasksByDate,
    filterTasksByWeek,
    filterTasksByCategory,
    filterTasksBySelected,
}
