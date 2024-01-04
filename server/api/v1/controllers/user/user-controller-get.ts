import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceGet } from "../../services/user";


export class UserControllerGet extends BaseUserController {
    services: UserServiceGet = new UserServiceGet();

    constructor() {
        super();
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.services.getUser(req.session.user!);
            return res.status(200).json({ status: 200, message: "Successfully fetched user data", user });
        } catch (error: any) {
            return next(error);
        }
    }
}
