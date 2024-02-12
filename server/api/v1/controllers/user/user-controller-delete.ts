import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceDelete } from "../../services/user";


export class UserControllerDelete extends BaseController {
    services: UserServiceDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceDelete(req, res, next);
    }

    async delete() {
        try {
            await this.services.delete();
            return this.responses.responseOK("Account successfully deleted");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
