import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { SessionUser } from "../../helpers/session";
import User from "../../../../database/models/user.model";


export class UserServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async delete(): Promise<void> {
        const user = this.getUser();
        await User.destroy({ where: { id: user.id }});
        SessionUser.destroy(this.req);
        return;
    }
}
