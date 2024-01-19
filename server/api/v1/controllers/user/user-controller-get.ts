import { Request, Response, NextFunction } from "express";
import { UserBaseController } from "./user-base-controller";
import { UserServiceGet } from "../../services/user";


export class UserControllerGet extends UserBaseController {
    services: UserServiceGet;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceGet(req, res, next);
    }

    async getUser() {
        try {
            const user = await this.services.getUser();
            return this.responses.responseOK("Successfully fetched user data", { data: user });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
