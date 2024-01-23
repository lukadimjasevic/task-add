import { BaseService, TrimData } from "../base-service";
import { Request, Response, NextFunction } from "express";


export class TaskBaseService extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    trimData(data: TrimData, keys: string[] = []): TrimData {
        return super.trimData(data, keys);
    }
}
