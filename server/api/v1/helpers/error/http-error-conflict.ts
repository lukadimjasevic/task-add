import { HttpError } from "./http-error";

export class HttpErrorConflict extends HttpError {
    constructor(message: string = "Conflict", details?: object) {
        super(message, 409, details);
        this.name = "HttpErrorConflict";
    }
}
