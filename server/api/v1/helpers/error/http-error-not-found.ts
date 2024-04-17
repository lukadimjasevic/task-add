import { HttpError } from "./http-error";

export class HttpErrorNotFound extends HttpError {
    constructor(message: string = "Not Found", details?: object) {
        super(message, 404, details);
        this.name = "HttpErrorNotFound";
    }
}
