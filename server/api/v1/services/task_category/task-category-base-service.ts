import { BaseService } from "../base-service";
import { Request, Response, NextFunction } from "express";
import { TrimData } from "../base-service";


export class TaskCategoryBaseService extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    trimData(data: TrimData, keys: string[] = ["id", "userId"]): TrimData {
        return super.trimData(data, keys);
    }
}
