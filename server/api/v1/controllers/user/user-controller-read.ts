import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceRead } from "../../services/user";


export class UserControllerRead extends BaseController {
    services: UserServiceRead;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceRead(req, res, next);
    }

    async get() {
        try {
            const user = await this.services.get();
            return this.responses.responseOK("Successfully fetched user data", { data: user });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
