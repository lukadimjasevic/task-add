declare module "taskadd/task" {
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

    export interface TaskStatus {
        color: string;
        name: string;
    }

    export interface TaskCategory {
        color: string;
        name: string;
        createDate: Date;
        updateDate: Date;
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
}
