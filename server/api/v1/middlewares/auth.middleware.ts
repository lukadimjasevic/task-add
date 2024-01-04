import { Request, Response, NextFunction } from "express";
import { HttpErrorUnauthorized } from "../helpers/error";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        return next();
    } else {
        return next(new HttpErrorUnauthorized("Unauthorized access"));
    }
}
