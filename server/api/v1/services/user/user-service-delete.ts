import { Request, Response, NextFunction } from "express";
import { BaseUserService } from "./base-user-service";
import { SessionUserData } from "../../interfaces/types/express-session";


export class UserServiceDelete extends BaseUserService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next)
    }

    async deleteUser(): Promise<void> {
        const userSession: SessionUserData = this.req.session.user!;
        await this.deleteOne(userSession.id);
        this.destroySession();
    }
}
