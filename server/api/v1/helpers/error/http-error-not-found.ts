import { HttpError } from "./http-error";

export class HttpErrorNotFound extends HttpError {
    constructor(message: string = "Not Found", errors?: object) {
        super(message, 404, errors);
        this.name = "HttpErrorNotFound";
    }
}
