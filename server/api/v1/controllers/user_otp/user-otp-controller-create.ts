import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserOtpServiceCreate } from "../../services/user_otp";


export class UserOtpControllerCreate extends BaseController {
    services: UserOtpServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserOtpServiceCreate(req, res, next);
    }

    async generateOTP() {
        try {
            const qrcode = await this.services.generateOTP();
            return this.responses.responseCreated("Successfully generated otp", { data: { qrcode }});
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async enable2FA() {
        try {
            await this.services.enable2FA();
            return this.responses.responseCreated("Successfully enabled 2FA");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async verify2FA() {
        try {
            await this.services.verify2FA();
            return this.responses.responseOK("Authentication successful");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
