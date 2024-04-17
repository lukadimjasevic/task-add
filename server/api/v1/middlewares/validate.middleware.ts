import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Hash } from "../helpers/hash";
import { HttpErrorBadRequest, HttpErrorUnauthorized } from "../helpers/error";
import User from "../../../database/models/user.model";

export const validate = ((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpErrorBadRequest("Invalid request. Please check and try again.", errors.array()));
    }

    return next();
});

export const validateUserSignin = async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.unscoped().findOne({ where: { email }});
    if (!user) {
        return next(new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials."));
    }
    const hashMatch = await Hash.compare(password, user.password);
    if (!hashMatch) {
        return next(new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials."));
    }
    res.locals.user = user;
    return next();
}
