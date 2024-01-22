import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceSignout } from "../../services/user";


export class UserControllerSignout extends BaseController {
    services: UserServiceSignout;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignout(req, res, next);
    }

    async signoutUser() {
        try {
            this.services.signoutUser();
            return this.responses.responseOK("Successfully signed out");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
