import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import { UserUpdate } from "../../interfaces/user.interface";
import User from "../../../../database/models/user.model";


export class UserServiceUpdate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async update(): Promise<User> {
        const user = this.getUser();
        const data: UserUpdate = this.req.body; 
 
        data.avatar !== undefined ? user.avatar = data.avatar : null;
        data.firstname !== undefined ? user.firstname = data.firstname : null;
        data.lastname !== undefined ? user.lastname = data.lastname : null;
        data.password !== undefined ? user.password = await Hash.create(data.password) : null;

        await user.save();
        
        return (await User.findByPk(user.id))!;
    }
}
