declare module "taskadd/response" {
    export interface Response {
        statusCode: number;
        message: string;
        errorName?: string;
        details?: any[] | any;
        data?: any;
    }
}
