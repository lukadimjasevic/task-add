import { HttpError } from "./http-error";

export class HttpErrorInternalServerError extends HttpError {
    constructor(message: string = "Something went wrong. Please try again later.", errors?: Object) {
        super(message, 500, errors);
        this.name = "HttpErrorInternalServerError";
    }
}
