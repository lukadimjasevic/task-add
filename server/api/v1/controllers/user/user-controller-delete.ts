import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";


export class UserControllerDelete extends BaseUserController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteUser() {
        return this.res.send("Delete User");
    }
}
