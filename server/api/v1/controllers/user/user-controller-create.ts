import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceCreate } from "../../services/user";


export class UserControllerCreate extends BaseController {
    services: UserServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceCreate(req, res, next);
    }

    async signup() {
        try {
            const user = await this.services.signup();
            return this.responses.responseCreated("Successfully created a new account", { data: user });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async signin() {
        try {
            await this.services.signin();
            return this.responses.responseOK("Successfully signed in");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    signout() {
        try {
            this.services.signout();
            return this.responses.responseOK("Successfully signed out");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async verifyGenerate() {
        try {
            const verificationCodeLastDate = await this.services.generateVerificationCode();
            return this.responses.responseCreated("Successfully generated a new verification code", { data: { verificationCodeLastDate }});
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async verifyValidate() {
        try {
            await this.services.validateVerificationCode();
            return this.responses.responseOK("Account successfully verified");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
