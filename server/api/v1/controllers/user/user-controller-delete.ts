import { Request, Response, NextFunction } from "express";
import { UserBaseController } from "./user-base-controller";
import { UserServiceDelete } from "../../services/user";


export class UserControllerDelete extends UserBaseController {
    services: UserServiceDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceDelete(req, res, next);
    }

    async deleteUser() {
        try {
            await this.services.deleteUser();
            return this.responses.responseOK("Account successfully deleted");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
