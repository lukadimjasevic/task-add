import { HttpError } from "./http-error";

export class HttpErrorInternalServerError extends HttpError {
    constructor(message: string = "Something went wrong. Please try again later.", details?: object) {
        super(message, 500, details);
        this.name = "HttpErrorInternalServerError";
    }
}
