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

    export interface GroupTasks {
        [key: string]: Task[];
    }
}
