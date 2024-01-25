import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { UserUpdate } from "../../interfaces/user.interface";
import { HttpErrorNotFound } from "../../helpers/error";
import User from "../../../../database/models/user.model";


export class UserServiceUpdate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async update(): Promise<User> {
        const userSession = this.getSessionUser();

        const getUpdateValues = (): UserUpdate => {
            const data: UserUpdate = this.req.body;
            const values: UserUpdate = {};
            data.avatar !== undefined ? values.avatar = data.avatar : null;
            data.firstname !== undefined ? values.firstname = data.firstname : null;
            data.lastname !== undefined ? values.lastname = data.lastname : null;
            return values;
        };
        
        await User.update(getUpdateValues(), { where: { id: userSession.id }});
        const user = await User.findOne({
            where: { id: userSession.id },
            attributes: { exclude: ["id", "password", "verificationCode"] },
        });
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }

        return user;
    }
}
