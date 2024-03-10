import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import { SessionUser } from "../../helpers/session";
import { UserSignup, UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorUnauthorized, HttpErrorConflict, HttpErrorNotFound, HttpErrorBadRequest } from "../../helpers/error";
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

    async generateVerificationCode(): Promise<Date> {
        const user = this.getUser();
        const millisToNextCode = 1000 * 60; // 60 seconds
        
        if (user.verificationCodeLastDate && user.verificationCodeLastDate.getTime() + millisToNextCode > Date.now()) {
            throw new HttpErrorBadRequest("You can generate a new verification code every 60 s");
        }

        const generateCode = () => {
            let code = "";
            for (let i = 0; i < 6; i++) {
                code += Math.floor(Math.random() * 10);
            }
            return code;
        };

        user.verificationCode = generateCode();
        user.verificationCodeLastDate = new Date();
        await user.save();
        return user.verificationCodeLastDate;
    }

    async validateVerificationCode(): Promise<void> {
        const user = this.getUser();
        const code: string = this.req.body.code;
        const millisToDeleteCode = 1000 * 60 * 10; // 10 minutes

        if (!user.verificationCodeLastDate || user.verificationCodeLastDate.getTime() + millisToDeleteCode < Date.now()) {
            user.verificationCode = null;
            user.verificationCodeLastDate = null;
            await user.save();
            throw new HttpErrorBadRequest("Verification code expired, please generate a new one");
        }

        if (user.verificationCode !== code) {
            throw new HttpErrorBadRequest("Verification codes do not match");   
        }

        user.verified = true;
        user.verificationCode = null;
        user.verificationCodeLastDate = null;
        await user.save();
    }
}
