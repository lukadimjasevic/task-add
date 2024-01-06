import { HttpError } from "./http-error";

export class HttpErrorBadRequest extends HttpError {
    constructor(message: string = "Bad Request", errors?: object) {
        super(message, 400, errors);
        this.name = "HttpErrorBadRequest";
    }
}
