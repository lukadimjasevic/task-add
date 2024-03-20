declare module "taskadd/task" {
    export interface TasksFrame {
        tasks: Task[];
        tasksSelected: TasksSelected;
    }

    export interface TasksSelected {
        count: number;
        selected: boolean;
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
}
