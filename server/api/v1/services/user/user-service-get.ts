import { BaseUserService } from "./base-user-service";
import { HttpErrorInternalServerError } from "../../helpers/error";
import { Request, Response, NextFunction } from "express";
import { TrimObjectData } from "./base-user-service";


export class UserServiceGet extends BaseUserService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getUser(): Promise<TrimObjectData> {
        const email = this.req.session.user!.email;
        const user = await this.find("email", email);
        if (!user) {
            throw new HttpErrorInternalServerError();
        }
        return this.trimObject(user.dataValues);
    }
}
