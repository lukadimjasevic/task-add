import { Request, Response, NextFunction } from "express";


export class BaseUserController {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    
    // Implement common validation methods, error handling, etc.
}
