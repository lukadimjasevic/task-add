export class HttpError extends Error {
    readonly statusCode: number;
    details?: object;

    constructor(message: string, statusCode: number, details?: object) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
