import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { OTPAuthTOTP } from "../../helpers/otp";
import UserOtp from "../../../../database/models/user_otp.model";


export class UserOtpServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getQRCode(): Promise<string> {
        const user = this.getUser();
        const userOtp: UserOtp = this.res.locals.userOtp;
        
        const totp = new OTPAuthTOTP({
            label: user.email,
            secret: userOtp.secret,
        });

        return await totp.generateQRCode();
    }
}
