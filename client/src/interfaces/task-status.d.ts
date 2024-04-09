declare module "taskadd/task-status" {
    export interface TaskStatusesFrame {
        statuses: TaskStatus[];
    }

    export interface TaskStatus {
        name: string;
        color: string;
    }
}
