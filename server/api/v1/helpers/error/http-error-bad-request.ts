import { HttpError } from "./http-error";

export class HttpErrorBadRequest extends HttpError {
    constructor(message: string = "Bad Request", details?: object) {
        super(message, 400, details);
        this.name = "HttpErrorBadRequest";
    }
}
