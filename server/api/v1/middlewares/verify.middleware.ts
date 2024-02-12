import { Request, Response, NextFunction } from "express";
import { HttpErrorConflict } from "../helpers/error";
import User from "../../../database/models/user.model";

export const isVerified = async(req: Request, res: Response, next: NextFunction) => {
    const user: User = res.locals.user;
    if (!user.verified) {
        return next();
    } else {
        return next(new HttpErrorConflict("Account is already verified"));
    }
};
