import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";


export class UserControllerSignout extends BaseUserController {
    constructor() {
        super();
    }

    async signoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            this.sessionUser.destroy(req);
            return res.status(200).json({ status: 200, message: "Successfully signed out" });
        } catch (error: any) {
            return next(error);
        }
    }
}
