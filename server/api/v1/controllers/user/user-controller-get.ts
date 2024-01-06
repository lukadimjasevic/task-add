import { Request, Response, NextFunction } from "express";
import { BaseUserController } from "./base-user-controller";
import { UserServiceGet } from "../../services/user";
import { SuccessfulResponses } from "../../helpers/response";


export class UserControllerGet extends BaseUserController {
    services: UserServiceGet;
    responses: SuccessfulResponses;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new UserServiceGet(req, res, next);
        this.responses = new SuccessfulResponses(res);
    }

    async getUser() {
        try {
            const user = await this.services.getUser();
            return this.responses.responseOK("Successfully fetched user data", { user });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
