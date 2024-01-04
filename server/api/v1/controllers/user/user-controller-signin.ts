import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignin } from "../../services/user";


export class UserControllerSignin extends BaseUserController {
    services: UserServiceSignin = new UserServiceSignin();

    constructor() {
        super();
    }

    async signinUser(req: Request, res: Response, next: NextFunction) {
        try {
            const sessionUserData = await this.services.signinUser(req.body);
            this.sessionUser.save(req, sessionUserData);
            return res.status(200).json({ status: 200, message: "Successfully signed in" });
        } catch (error: any) {
            return next(error);
        }
    }
}
