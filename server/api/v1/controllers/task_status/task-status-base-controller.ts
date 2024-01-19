import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";


export class TaskStatusBaseController extends BaseController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }
    
    // Implement common validation methods, error handling, etc.
}
