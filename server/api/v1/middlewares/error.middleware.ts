import { Request, Response, NextFunction } from "express";
import { HttpError } from "../helpers/error/http-error";

interface ErrorHandlerResponse {
    errorName: string;
    statusCode: number;
    message: string;
    errors?: Object;
};

export const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const response: ErrorHandlerResponse = {
        errorName: error.name,
        statusCode: error.statusCode,
        message: error.message,
    }
    error.errors ? response.errors = error.errors : null;
    return res.status(error.statusCode).json(response);
}
