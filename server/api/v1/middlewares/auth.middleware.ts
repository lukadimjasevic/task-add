import { Request, Response, NextFunction } from "express";
import { HttpErrorUnauthorized } from "../helpers/error";
import User from "../../../database/models/user.model";

export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        const user = await User.unscoped().findByPk(req.session.user.id);
        if (!user) {
            return next(new HttpErrorUnauthorized("Unauthorized access. Please provide valid credentials."));
        }
        res.locals.user = user;
        return next();
    } else {
        return next(new HttpErrorUnauthorized("Unauthorized access. Please provide valid credentials."));
    }
};
