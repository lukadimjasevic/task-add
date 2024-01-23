import { Request, Response, NextFunction } from "express";
import { UserBaseService } from "./user-base-service";
import { TrimData } from "../base-service";
import { UserUpdate } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound } from "../../helpers/error";
import User from "../../../../database/models/user.model";


export class UserServiceUpdate extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async update(): Promise<TrimData> {
        const data: UserUpdate = this.req.body;
        const userSession: SessionUserData = this.req.session.user!;
        const user = await User.findOne({ where: { id: userSession.id }});
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }
        data.avatar !== undefined ? user.avatar = data.avatar : null;
        data.firstname !== undefined ? user.firstname = data.firstname : null;
        data.lastname !== undefined ? user.lastname = data.lastname : null;
        await user.save();
        return this.trimData(user.dataValues);
    }
}
