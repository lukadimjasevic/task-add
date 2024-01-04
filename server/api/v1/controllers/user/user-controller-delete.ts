import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";


export class UserControllerDelete extends BaseUserController {
    constructor() {
        super();
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        return res.send("Delete User");
    }
}
