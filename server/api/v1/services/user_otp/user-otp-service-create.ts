import { Request, Response, NextFunction } from "express";
import { OTPSecret, OTPAuthTOTP } from "../../helpers/otp";
import { BaseService } from "../base-service";
import { SessionUser } from "../../helpers/session";
import { SessionUserData } from "../../interfaces/types/express-session";
import UserOtp from "../../../../database/models/user_otp.model";
import { HttpErrorUnauthorized } from "../../helpers/error";


export class UserOtpServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async generateOTP(): Promise<string> {
        const user = this.getUser();

        // Generates a secret key for the user
        const secret = OTPSecret.generateBase32Secret();

        // Generates an auth URL for the user
        const totp = new OTPAuthTOTP({
            label: user.email,
            secret: secret,
        });
        const authUrl = totp.toString();

        await UserOtp.create({
            secret: secret,
            authUrl: authUrl,
            userId: user.id,
        });

        user.otpGenerated = true;
        await user.save();

        return await totp.generateQRCode();
    }

    async enable2FA(): Promise<void> {
        const user = this.getUser();
        const userOtp: UserOtp = this.res.locals.userOtp;
        const token: string = this.req.body.token;
        
        const totp = new OTPAuthTOTP({
            label: user.email,
            secret: userOtp.secret,
        });
        const delta = totp.validate({ token: token, window: 1 });

        if (delta === null) {
            throw new HttpErrorUnauthorized("Authentication failed");
        }

        user.otpEnabled = true;
        await user.save();

        return;
    }

    async verify2FA(): Promise<SessionUserData> {
        const user = this.getUser();
        const userOtp: UserOtp = this.res.locals.userOtp;
        const token: string = this.req.body.token;
        
        const totp = new OTPAuthTOTP({
            label: user.email,
            secret: userOtp.secret,
        });
        const delta = totp.validate({ token: token, window: 1 });

        if (delta === null) {
            throw new HttpErrorUnauthorized("Authentication failed");
        }
        
        const userSession: SessionUserData = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        SessionUser.save(this.req, userSession);
        return userSession;  
    }
}
