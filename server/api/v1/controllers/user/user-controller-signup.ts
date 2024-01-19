import { Request, Response, NextFunction } from "express";
import { UserBaseController } from "./user-base-controller";
import { UserServiceSignup } from "../../services/user";


export class UserControllerSignup extends UserBaseController {
    services: UserServiceSignup;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignup(req, res, next);
    }

    async signupUser() {
        try {
            await this.services.signupUser();
            return this.responses.responseCreated("Successfully created a new account");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
