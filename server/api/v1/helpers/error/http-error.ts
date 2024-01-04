export class HttpError extends Error {
    readonly statusCode: number;
    errors?: Object;

    constructor(message: string, statusCode: number, errors?: Object) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
