import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignup } from "../../services/user";


export class UserControllerSignup extends BaseUserController {
    services: UserServiceSignup = new UserServiceSignup();

    constructor() {
        super();
    }

    async signupUser(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        try {
            await this.services.signupUser(data);
            return res.status(200).json({ status: 200, message: "Successfully created a new account" });
        } catch (error: any) {
            return next(error);
        }
    }
}
