import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceSignout } from "../../services/user";
import { SuccessfulResponses } from "../../helpers/response";


export class UserControllerSignout extends BaseUserController {
    services: UserServiceSignout;
    responses: SuccessfulResponses;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceSignout(req, res, next);
        this.responses = new SuccessfulResponses(res);
    }

    async signoutUser() {
        try {
            this.services.signoutUser();
            return this.responses.responseNoContent("Successfully signed out");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
