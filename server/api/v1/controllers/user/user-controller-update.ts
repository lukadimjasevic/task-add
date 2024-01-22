import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceUpdate } from "../../services/user";


export class UserControllerUpdate extends BaseController {
    services: UserServiceUpdate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceUpdate(req, res, next);
    }

    async updateUser() {
        try {
            const user = await this.services.updateUser();
            return this.responses.responseOK("Profile updated successfully", { user });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
