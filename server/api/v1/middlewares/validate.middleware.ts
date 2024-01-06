import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpErrorBadRequest } from "../helpers/error";

export const validate = ((req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpErrorBadRequest("Invalid request. Please check and try again.", errors.array()));
    }

    return next();
});
