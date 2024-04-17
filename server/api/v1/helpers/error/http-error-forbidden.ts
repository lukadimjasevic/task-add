import { HttpError } from "./http-error";

export class HttpErrorForbidden extends HttpError {
    constructor(message: string = "Forbidden", details?: object) {
        super(message, 403, details);
        this.name = "HttpErrorForbidden";
    }
}
