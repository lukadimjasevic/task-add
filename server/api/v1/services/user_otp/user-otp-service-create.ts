import { Request, Response, NextFunction } from "express";
import { OTPSecret } from "../../helpers/otp";
import { BaseService } from "../base-service";
import UserOtp from "../../../../database/models/user_otp.model";
import * as OTPAuth from "otpauth";


export class UserOtpServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async enable2FA(): Promise<void> {
        const user = this.getUser();

        // Generates a secret key for the user
        const secret = OTPSecret.generateBase32Secret();

        // Generates an auth URL for the user
        const totp = new OTPAuth.TOTP({
            issuer: "TaskAdd",
            label: user.email,
            algorithm: "SHA1",
            digits: 6,
            secret: secret,
        });
        const authUrl = totp.toString();

        await UserOtp.create({
            secret: secret,
            authUrl: authUrl,
            userId: user.id,
        });
    }
}
