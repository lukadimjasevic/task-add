import { HttpError } from "./http-error";

export class HttpErrorForbidden extends HttpError {
    constructor(message: string = "Forbidden", errors?: Object) {
        super(message, 403, errors);
        this.name = "HttpErrorForbidden";
    }
}
