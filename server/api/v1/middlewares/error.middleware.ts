import { Request, Response, NextFunction } from "express";
import { HttpError, HttpErrorInternalServerError } from "../helpers/error";

interface ErrorHandlerResponse {
    errorName: string;
    statusCode: number;
    message: string;
    errors?: Object;
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof HttpError)) {
        next(error);
        const internalError = new HttpErrorInternalServerError();
        return res.status(internalError.statusCode).json({
            errorName: internalError.name,
            message: internalError.message,
        });
    }
    const response: ErrorHandlerResponse = {
        errorName: error.name,
        statusCode: error.statusCode,
        message: error.message,
    }
    error.errors ? response.errors = error.errors : null;
    return res.status(error.statusCode).json(response);
}
