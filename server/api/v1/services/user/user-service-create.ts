import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Hash } from "../../helpers/hash";
import { SessionUser } from "../../helpers/session";
import { Mailer } from "../../helpers/mailer";
import { UserSignup, UserSignin, UserGenerateVerification, UserValidateVerification } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorUnauthorized, HttpErrorConflict, HttpErrorForbidden, HttpErrorBadRequest } from "../../helpers/error";
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
        const code = this.generateCode();
        await User.create({
            email: data.email,
            username: data.username,
            password: await Hash.create(data.password),
            verificationCode: code,
            verificationCodeLastDate: new Date(),
        });
        await this.sendVerificationCode(data.email, code);
        const user = await User.findOne({ where: { email: data.email }});
        return user!;
    }

    async signin(): Promise<SessionUserData> {
        const data: UserSignin = this.req.body;
        const user = await this.validateUser(data.email, data.password);
        if (!user.verified) {
            throw new HttpErrorForbidden("Account isn't verified. Please verify your account and try again.");
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
        const data: UserGenerateVerification = this.req.body;
        const user = await this.validateUser(data.email, data.password);
        const millisToNextCode = 1000 * 60; // 60 seconds

        // Check if user is already verified
        if (user.verified) {
            throw new HttpErrorConflict("Account is already verified.");
        }
        
        if (user.verificationCodeLastDate && user.verificationCodeLastDate.getTime() + millisToNextCode > Date.now()) {
            throw new HttpErrorBadRequest("You can generate a new verification code every 60 s");
        }

        const code = this.generateCode();
        user.verificationCode = code;
        user.verificationCodeLastDate = new Date();
        await user.save();
        await this.sendVerificationCode(user.email, code);
        return user.verificationCodeLastDate;
    }

    async validateVerificationCode(): Promise<void> {
        const data: UserValidateVerification = this.req.body;
        const user = await this.validateUser(data.email, data.password);
        const millisToDeleteCode = 1000 * 60 * 10; // 10 minutes

        // Check if user is already verified
        if (user.verified) {
            throw new HttpErrorConflict("Account is already verified.");
        }

        if (!user.verificationCodeLastDate || user.verificationCodeLastDate.getTime() + millisToDeleteCode < Date.now()) {
            user.verificationCode = null;
            user.verificationCodeLastDate = null;
            await user.save();
            throw new HttpErrorBadRequest("Verification code expired, please generate a new one");
        }

        if (user.verificationCode !== data.code) {
            throw new HttpErrorBadRequest("Verification codes do not match");   
        }

        user.verified = true;
        user.verificationCode = null;
        user.verificationCodeLastDate = null;
        await user.save();
    }

    private async validateUser(email: string, password: string): Promise<User> {
        const user = await User.unscoped().findOne({ where: { email }});
        if (!user) {
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        const hashMatch = await Hash.compare(password, user.password);
        if (!hashMatch) {
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        return user;
    }

    private generateCode(): string {
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += Math.floor(Math.random() * 10);
        }
        return code;
    }

    private async sendVerificationCode(email: string, code: string) {
        await Mailer.sendMail({
            to: email,
            subject: "TaskAdd verification code",
            text: `Hi ${email},\nYour TaskAdd verification code is ${code}`,
        });
    }
}
