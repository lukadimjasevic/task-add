import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import UserOtp from "../../../../database/models/user_otp.model";


export class UserOtpDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async delete2FA(): Promise<void> {
        const userOtp: UserOtp = this.res.locals.userOtp;
        await userOtp.destroy();
        return;
    }
}
