import { Request, Response, NextFunction } from "express";
import { HttpErrorUnauthorized } from "../helpers/error";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next();
    } else {
        next(new HttpErrorUnauthorized("Unauthorized access"));
    }
}
