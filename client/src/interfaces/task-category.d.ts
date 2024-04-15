declare module "taskadd/task-category" {
    export interface TaskCategoriesFrame {
        categories: ExtendedTaskCategory[];
    }

    export interface TaskCategory {
        id: number;
        color: string;
        name: string;
        createDate: Date;
        updateDate: Date;
    }

    export interface ExtendedTaskCategory extends TaskCategory {
        count: number;
    }
}
