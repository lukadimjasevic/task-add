import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import User from "../../../../database/models/user.model";


export class UserServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async get(): Promise<User> {
        const userSession = this.getSessionUser();
        const user = await User.findOne({where: { id: userSession.id }});
        return user!;
    }
}
