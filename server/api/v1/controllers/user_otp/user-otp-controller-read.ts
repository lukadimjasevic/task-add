import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserOtpServiceRead } from "../../services/user_otp";


export class UserOtpControllerRead extends BaseController {
    services: UserOtpServiceRead;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserOtpServiceRead(req, res, next);
    }

    async getQRCode() {
        try {
            const qrcode = await this.services.getQRCode();
            return this.responses.responseOK("Successfully fetched QR code URL", { data: { qrcode }});
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
