import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignup } from "../../services/user";
import { SuccessfulResponses } from "../../helpers/response";


export class UserControllerSignup extends BaseUserController {
    services: UserServiceSignup;
    responses: SuccessfulResponses;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignup(req, res, next);
        this.responses = new SuccessfulResponses(res);
    }

    async signupUser() {
        try {
            const data = this.req.body;
            await this.services.signupUser(data);
            return this.responses.responseCreated("Successfully created a new account");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
