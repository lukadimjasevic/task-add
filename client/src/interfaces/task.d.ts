declare module "taskadd/task" {
    import type { TaskCategory } from "taskadd/task-category";
    import type { TaskStatus } from "taskadd/task-status";

    export interface TasksFrame {
        tasks: Task[];
        countActive: number;
        countUpcoming: number;
        countToday: number;
        countTomorrow: number;
        countWeek: number;
        countFuture: number;
    }

    export interface Task {
        id: number;
        deadlineDate: Date;
        description: string;
        name: string;
        createDate: Date;
        updateDate: Date;
        status: TaskStatus;
        categories: TaskCategory[];

        // Abstract properties
        selected: boolean;
    }

    export interface TaskGetDTO {
        id: Task["id"];
    }

    export interface TaskCreateDTO {
        name: Task["name"];
        description: Task["description"];
        deadlineDate: Task["deadlineDate"];
    }

    export interface TaskUpdateDTO {
        id: Task["id"];
        name?: Task["name"];
        description?: Task["description"];
        deadlineDate?: Task["deadlineDate"];
        status?: TaskStatus["name"];
    }

    export interface TaskDeleteDTO {
        id: Task["id"];
    }

    export interface TaskList {
        id: number;
        checked: boolean;
    }

    export interface GroupDayTasks {
        [key: string]: {
            date: Date;
            tasks: Task[];
        };
    }

    export interface GroupWeekTasks {
        [key: string]: {
            date: Date;
            days: TaskDays;
        };
    }

    export interface TaskDays {
        mon: Task[];
        tue: Task[];
        wed: Task[];
        thu: Task[];
        fri: Task[];
        sat: Task[];
        sun: Task[];
    }

    export interface MonthView {
        mon: MonthWeekdayView | null;
        tue: MonthWeekdayView | null;
        wed: MonthWeekdayView | null;
        thu: MonthWeekdayView | null;
        fri: MonthWeekdayView | null;
        sat: MonthWeekdayView | null;
        sun: MonthWeekdayView | null;
    }

    export interface MonthWeekdayView {
        date: Date;
        tasks: Task[];
    }
}
