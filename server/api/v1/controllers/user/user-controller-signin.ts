import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignin } from "../../services/user";


export class UserControllerSignin extends BaseUserController {
    services: UserServiceSignin;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignin(req, res, next);
    }

    async signinUser() {
        try {
            const data = this.req.body;
            await this.services.signinUser(data);
            return this.responseOK("Successfully signed in");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
