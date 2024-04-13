declare module "taskadd/toast" {
    export interface Toast extends ToastOptions {
        uuid: string;
        type: "success" | "error";
        title: string;
        description: string;
    }

    export interface ToastOptions {
        duration?: number;
    }
}
