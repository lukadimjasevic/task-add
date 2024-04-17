import { Request, Response, NextFunction } from "express";
import { HttpErrorBadRequest, HttpErrorConflict } from "../helpers/error";
import User from "../../../database/models/user.model";
import UserOtp from "../../../database/models/user_otp.model";

export const checkOTPNotGenerated = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    if (user.otpGenerated) {
        return next(new HttpErrorBadRequest("Account has already generated OTP"));
    }
    return next();
}

export const checkOTPGenerated = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    if (!user.otpGenerated) {
        return next(new HttpErrorBadRequest("Account must have OTP generated"));
    }
    const userOtp = await UserOtp.unscoped().findOne({ where: { userId: user.id }});
    res.locals.userOtp = userOtp;
    return next();
}

export const checkOTPNotEnabled = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    if (!user.otpGenerated) {
        return next(new HttpErrorBadRequest("You have to generate OTP to enable 2FA"));
    }
    if (user.otpEnabled) {
        return next(new HttpErrorConflict("Account has already enabled 2FA"));
    }
    const userOtp = await UserOtp.unscoped().findOne({ where: { userId: user.id }});
    res.locals.userOtp = userOtp;
    return next();
};

export const checkOTPEnabled = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    if (!user.otpEnabled) {
        return next(new HttpErrorBadRequest("Account must have 2FA enabled"));
    }
    const userOtp = await UserOtp.unscoped().findOne({ where: { userId: user.id }});
    res.locals.userOtp = userOtp;
    return next();
};
