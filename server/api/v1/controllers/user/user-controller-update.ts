import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";


export class UserControllerUpdate extends BaseUserController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateUser() {
        return this.res.send("Update User");
    }
}
