import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignin } from "../../services/user";
import { SuccessfulResponses } from "../../helpers/response";


export class UserControllerSignin extends BaseUserController {
    services: UserServiceSignin;
    responses: SuccessfulResponses;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignin(req, res, next);
        this.responses = new SuccessfulResponses(res);
    }

    async signinUser() {
        try {
            await this.services.signinUser();
            return this.responses.responseOK("Successfully signed in");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
