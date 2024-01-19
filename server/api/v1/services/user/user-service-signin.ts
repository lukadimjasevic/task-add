import { UserBaseService } from "./user-base-service";
import { UserSignin } from "../../interfaces/user.interface";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorUnauthorized } from "../../helpers/error";
import { Request, Response, NextFunction } from "express";


export class UserServiceSignin extends UserBaseService {
    constructor(req: Request, res: Response, next: NextFunction ) {
        super(req, res, next);
    }

    async signinUser(): Promise<SessionUserData> {
        const data: UserSignin = this.req.body;
        const user = await this.findOne("email", data.email);
        const hashMatch = await this.hash.compare(data.password, user.password);
        if (!hashMatch) {
            throw new HttpErrorUnauthorized("Email or password is incorrect. Please provide valid credentials.");
        }
        const userSession: SessionUserData = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        this.sessionUser.save(this.req, userSession);
        return userSession;  
    }
}
