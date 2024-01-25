import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { SessionUser } from "../../helpers/session";
import User from "../../../../database/models/user.model";


export class UserServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async delete(): Promise<void> {
        const userSession = this.getSessionUser();
        await User.destroy({ where: { id: userSession.id }});
        SessionUser.destroy(this.req);
        return;
    }
}
