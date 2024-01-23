import { Request, Response, NextFunction } from "express";
import { SessionUserData } from "../../interfaces/types/express-session";
import { UserBaseService } from "./user-base-service";
import { TrimData } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import User from "../../../../database/models/user.model";


export class UserServiceRead extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async get(): Promise<TrimData> {
        const userSession: SessionUserData = this.req.session.user!;
        const user = await User.findOne({ where: { id: userSession.id }});
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }
        return this.trimData(user.dataValues);
    }
}
