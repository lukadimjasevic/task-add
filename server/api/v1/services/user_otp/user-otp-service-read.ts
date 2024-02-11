import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import UserOtp from "../../../../database/models/user_otp.model";
import * as QRCode from "qrcode";


export class UserOtpServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getQRCode(): Promise<string> {
        const userOtp: UserOtp = this.res.locals.userOtp;
        
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(userOtp.authUrl, (error, qrCodeUrl) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(qrCodeUrl);
                }
            });
        });
    }
}
