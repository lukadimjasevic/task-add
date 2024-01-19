import { SessionUserData } from "../../interfaces/types/express-session";
import { UserBaseService, TrimObjectData } from "./user-base-service";
import { Request, Response, NextFunction } from "express";


export class UserServiceGet extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getUser(): Promise<TrimObjectData> {
        const userSession: SessionUserData = this.req.session.user!;
        const user = await this.findOne("id", userSession.id);
        return this.trimObject(user.dataValues);
    }
}
