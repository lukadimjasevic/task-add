import { Request, Response, NextFunction } from "express";
import { HttpErrorBadRequest } from "../helpers/error";
import User from "../../../database/models/user.model";
import UserOtp from "../../../database/models/user_otp.model";

export const isAvailable2FA = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const userOtp = await UserOtp.findOne({ where: { userId: user.id }});
    if (user.verified && !userOtp) {
        return next();
    } else if (!user.verified) {
        return next(new HttpErrorBadRequest("Account must be verified to enable 2FA"));
    } else {
        return next(new HttpErrorBadRequest("Account has already enabled 2FA"));
    }
};

export const isEnabled2FA = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    const userOtp = await UserOtp.unscoped().findOne({ where: { userId: user.id }});
    if (user.verified && userOtp) {
        res.locals.userOtp = userOtp;
        return next();
    } else if (!user.verified) {
        return next(new HttpErrorBadRequest("Account must be verified and have 2FA enabled"));
    } else {
        return next(new HttpErrorBadRequest("Account must have 2FA enabled"));
    }
};
