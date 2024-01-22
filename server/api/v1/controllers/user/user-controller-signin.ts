import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceSignin } from "../../services/user";


export class UserControllerSignin extends BaseController {
    services: UserServiceSignin;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignin(req, res, next);
    }

    async signinUser() {
        try {
            await this.services.signinUser();
            return this.responses.responseOK("Successfully signed in");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
