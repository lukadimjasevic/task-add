import { Request, Response, NextFunction } from "express";
import { UserBaseService } from "./user-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";


export class UserServiceDelete extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next)
    }

    async deleteUser(): Promise<void> {
        const userSession: SessionUserData = this.req.session.user!;
        await this.deleteOne(userSession.id);
        this.destroySession();
    }
}
