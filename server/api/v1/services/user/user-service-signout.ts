import { BaseUserService } from "./base-user-service";
import { Request, Response, NextFunction } from "express";


export class UserServiceSignout extends BaseUserService {
    constructor(req: Request, res: Response, next: NextFunction ) {
        super(req, res, next);
    }

    signoutUser(): void {
        this.destroySession();
    }
}
