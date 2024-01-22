import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { UserServiceCreate } from "../../services/user";


export class UserControllerCreate extends BaseController {
    services: UserServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceCreate(req, res, next);
    }

    async signupUser() {
        try {
            await this.services.signupUser();
            return this.responses.responseCreated("Successfully created a new account");
        } catch (error: any) {
            return this.next(error);
        }
    }

    async signinUser() {
        try {
            await this.services.signinUser();
            return this.responses.responseOK("Successfully signed in");
        } catch (error: any) {
            return this.next(error);
        }
    }

    async signoutUser() {
        try {
            this.services.signoutUser();
            return this.responses.responseOK("Successfully signed out");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
