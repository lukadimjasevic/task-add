import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceGet } from "../../services/user";


export class UserControllerGet extends BaseUserController {
    services: UserServiceGet;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceGet(req, res, next);
    }

    async getUser() {
        try {
            const user = await this.services.getUser();
            return this.responseOK("Successfully fetched user data", { user });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
