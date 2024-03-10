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
        data.avatar = this.req.file;
        
        if (data.avatar === undefined || !data.avatar.size) {
            user.avatar = null;
        } else {
            user.avatar = data.avatar.buffer;
        }
        if (data.firstname === undefined || data.firstname === "") {
            user.firstname = null;
        } else {
            user.firstname = data.firstname;
        }
        if (data.lastname === undefined || data.lastname === "") {
            user.lastname = null;
        } else {
            user.lastname = data.lastname;
        }
        
        data.password !== undefined ? user.password = await Hash.create(data.password) : null;

        await user.save();
        
        return (await User.findByPk(user.id))!;
    }
}
