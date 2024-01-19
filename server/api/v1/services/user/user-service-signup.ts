import { UserBaseService } from "./user-base-service";
import User from "../../../../database/models/user.model";
import { UserSignup } from "../../interfaces/user.interface";
import { Request, Response, NextFunction } from "express";


export class UserServiceSignup extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async signupUser(): Promise<User> {
        const data: UserSignup = this.req.body;
        const user = await this.create(data);
        return user;
    }
}
