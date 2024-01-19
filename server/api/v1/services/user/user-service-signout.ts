import { UserBaseService } from "./user-base-service";
import { Request, Response, NextFunction } from "express";


export class UserServiceSignout extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction ) {
        super(req, res, next);
    }

    signoutUser(): void {
        this.destroySession();
    }
}
