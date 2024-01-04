import { HttpError } from "./http-error";

export class HttpErrorUnauthorized extends HttpError {
    constructor(message: string = "Unauthorized", errors?: Object) {
        super(message, 401, errors);
        this.name = "HttpErrorUnauthorized";
    }
}
