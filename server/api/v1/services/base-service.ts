import { Request, Response, NextFunction } from "express";
import { SessionUserData } from "../interfaces/types/express-session";
import User from "../../../database/models/user.model";


export class BaseService {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    /**
     * Method returns user from a session
     * @returns User session data of type SessionUserData
     */
    getSessionUser(): SessionUserData {
        return this.req.session.user!;
    }

    /**
     * Method returns the current user
     * @returns Instance of User's model from res.locals object
     */
    getUser(): User {
        return this.res.locals.user;
    }
}
