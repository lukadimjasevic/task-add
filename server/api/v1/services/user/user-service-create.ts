import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import { SessionUser } from "../../helpers/session";
import { UserSignup, UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorUnauthorized, HttpErrorConflict, HttpErrorNotFound } from "../../helpers/error";
import User from "../../../../database/models/user.model";


export class UserServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async signup(): Promise<User> {
        const data: UserSignup = this.req.body;
        const users = await User.findAll({ where: { email: data.email }});
        if (users.length) {
            throw new HttpErrorConflict("User already exists. Please provide valid credentials.");
        }
        const user = await User.create({
            email: data.email,
            username: data.username,
            password: await Hash.create(data.password),
        });
        return user;
    }

    async signin(): Promise<SessionUserData> {
        const data: UserSignin = this.req.body;
        const user = await User.unscoped().findOne({ where: { email: data.email }});
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }
        const hashMatch = await Hash.compare(data.password, user.password);
        if (!hashMatch) {
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        const userSession: SessionUserData = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        SessionUser.save(this.req, userSession);
        return userSession;  
    }

    signout(): void {
        SessionUser.destroy(this.req);
    }
}
