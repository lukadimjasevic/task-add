export class HttpError extends Error {
    readonly statusCode: number;
    errors?: object;

    constructor(message: string, statusCode: number, errors?: object) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
