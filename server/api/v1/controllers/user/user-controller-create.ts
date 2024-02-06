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
            await this.services.signup();
            return this.responses.responseCreated("Successfully created a new account");
        } catch (error: any) {
            return this.next(error);
        }
    }

    async signin() {
        try {
            await this.services.signin();
            return this.responses.responseOK("Successfully signed in");
        } catch (error: any) {
            return this.next(error);
        }
    }

    async signout() {
        try {
            this.services.signout();
            return this.responses.responseOK("Successfully signed out");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
