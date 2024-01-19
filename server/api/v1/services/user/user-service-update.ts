import { Request, Response, NextFunction } from "express";
import { UserBaseService, TrimObjectData } from "./user-base-service";
import { UserUpdate } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";


export class UserServiceUpdate extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateUser(): Promise<TrimObjectData> {
        const rawData = this.req.body;
        const data: UserUpdate = {};
        rawData.avatar !== undefined ? data.avatar = rawData.avatar : null;
        rawData.firstname !== undefined ? data.firstname = rawData.firstname : null;
        rawData.lastname !== undefined ? data.lastname = rawData.lastname : null;
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
