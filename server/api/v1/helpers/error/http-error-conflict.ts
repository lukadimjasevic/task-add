import { HttpError } from "./http-error";

export class HttpErrorConflict extends HttpError {
    constructor(message: string = "Conflict", errors?: object) {
        super(message, 409, errors);
        this.name = "HttpErrorConflict";
    }
}
