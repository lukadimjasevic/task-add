import { Request, Response, NextFunction } from "express";
import { UserBaseService } from "./user-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import User from "../../../../database/models/user.model";


export class UserServiceDelete extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async delete(): Promise<void> {
        const userSession: SessionUserData = this.req.session.user!;
        await User.destroy({ where: { id: userSession.id }});
        this.sessionUser.destroy(this.req);
        return;
    }
}
