import { SessionUserData } from "../../interfaces/types/express-session";
import { UserBaseService } from "./user-base-service";
import { TrimData } from "../base-service";
import { Request, Response, NextFunction } from "express";


export class UserServiceGet extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getUser(): Promise<TrimData> {
        const userSession: SessionUserData = this.req.session.user!;
        const user = await this.findOne("id", userSession.id);
        return this.trimData(user.dataValues);
    }
}
