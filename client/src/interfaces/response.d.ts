declare module "taskadd/response" {
    export interface Response {
        statusCode: number;
        message: string;
        errorName?: string;
        errors?: ResponseError[];
        data?: any;
    }

    export interface ResponseError {
        msg: string;
    }
}
