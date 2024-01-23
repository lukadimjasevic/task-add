import { BaseService, TrimData } from "../base-service";
import { Hash } from "../../helpers/hash";
import { SessionUser } from "../../helpers/session";
import { Request, Response, NextFunction } from "express";


export class UserBaseService extends BaseService {
    hash: Hash = new Hash();
    sessionUser: SessionUser = new SessionUser();

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    trimData(data: TrimData, keys: string[] = ["id", "password", "verificationCode"]): TrimData {
        return super.trimData(data, keys);
    }
}
