import { Request } from "express";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorInternalServerError } from "../error";


export class SessionUser {
    constructor() {}

    static save(req: Request, data: SessionUserData) {
        req.session.user = data;
        req.session.save((error) => {
            if (error) {
                console.log(error);
                throw new HttpErrorInternalServerError();
            }
        });
    }

    static destroy(req: Request) {
        req.session.user = undefined;
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                throw new HttpErrorInternalServerError();
            }
        });
    }
}
