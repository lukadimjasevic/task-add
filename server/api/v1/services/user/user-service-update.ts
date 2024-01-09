import { Request, Response, NextFunction } from "express";
import { BaseUserService, TrimObjectData } from "./base-user-service";
import { UserUpdate } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";


export class UserServiceUpdate extends BaseUserService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateUser(): Promise<TrimObjectData> {
        const data: UserUpdate = this.req.body;
        const userSession: SessionUserData = this.req.session.user!;
        const fields = Object.keys(data);
        fields.forEach(async(field) => {
            const value = data[field as keyof UserUpdate];
            await this.updateOne(field, value, userSession.id);
        });
        const user = await this.findOne("id", userSession.id);
        return this.trimObject(user.dataValues);
    }
}
