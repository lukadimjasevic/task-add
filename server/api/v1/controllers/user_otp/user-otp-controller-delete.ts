import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserOtpDelete } from "../../services/user_otp";


export class UserOtpControllerDelete extends BaseController {
    services: UserOtpDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserOtpDelete(req, res, next);
    }

    async delete2FA() {
        try {
            await this.services.delete2FA();
            return this.responses.responseOK("Successfully disabled 2FA");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
