import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";


export class UserControllerUpdate extends BaseUserController {
    constructor() {
        super();
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        return res.send("Update User");
    }
}
