import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceUpdate } from "../../services/user";


export class UserControllerUpdate extends BaseController {
    services: UserServiceUpdate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceUpdate(req, res, next);
    }

    async update() {
        try {
            const user = await this.services.update();
            return this.responses.responseOK("Profile updated successfully", { data: user });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
