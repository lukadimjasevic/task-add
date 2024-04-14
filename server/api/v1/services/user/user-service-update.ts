import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import { UserUpdate, UserUpdatePassword } from "../../interfaces/user.interface";
import { HttpErrorUnauthorized } from "../../helpers/error";
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
        
        await user.save();
        
        return (await User.findByPk(user.id))!;
    }

    async updatePassword(): Promise<void> {
        const user = this.getUser();
        const data: UserUpdatePassword = this.req.body;

        // Stored password and old password don't match
        const hashMatch = await Hash.compare(data.passwordOld, user.password);
        if (!hashMatch) {
            throw new HttpErrorUnauthorized("Incorrect old password.");
        }

        user.password = await Hash.create(data.password);;
        await user.save();
        return;
    }
}
