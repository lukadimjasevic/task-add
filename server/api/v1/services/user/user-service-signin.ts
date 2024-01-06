import { BaseUserService } from "./base-user-service";
import { UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound, HttpErrorUnauthorized } from "../../helpers/error";
import { Request, Response, NextFunction } from "express";


export class UserServiceSignin extends BaseUserService {
    constructor(req: Request, res: Response, next: NextFunction ) {
        super(req, res, next);
    }

    async signinUser(data: UserSignin): Promise<SessionUserData> {
        const user = await this.find("email", data.email);
        if (!user) {
            throw new HttpErrorNotFound("User doesn't exist. Please provide valid credentials.");
        }
        const hashMatch = await this.hash.compare(data.password, user.password);
        if (!hashMatch) {
            // Email or password is incorrect
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        const sessionUserData: SessionUserData =  {
            email: user.email,
            username: user.username,
        };
        this.sessionUser.save(this.req, sessionUserData);
        return sessionUserData;  
    }
}
