import { HttpError } from "./http-error";

export class HttpErrorUnauthorized extends HttpError {
    constructor(message: string = "Unauthorized", details?: object) {
        super(message, 401, details);
        this.name = "HttpErrorUnauthorized";
    }
}
