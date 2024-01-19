import { Request, Response, NextFunction } from "express";
import { SuccessfulResponses } from "../../helpers/response";


export class BaseUserController {
    req: Request;
    res: Response;
    next: NextFunction;
    responses: SuccessfulResponses;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.responses = new SuccessfulResponses(res);
    }
    
    // Implement common validation methods, error handling, etc.
}
