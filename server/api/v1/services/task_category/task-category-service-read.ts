import { Request, Response, NextFunction } from "express";
import { TaskCategoryBaseService } from "./task-category-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { TrimData } from "../base-service";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceRead extends TaskCategoryBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getCategories(): Promise<TrimData[]> {
        const userSession: SessionUserData = this.req.session.user!;
        const dataValues: TrimData[] = [];
        const categories = await TaskCategory.findAll({ where: { userId: userSession.id } });
        categories.forEach((category) => {
            dataValues.push(this.trimData(category.dataValues));
        });
        return dataValues;
    }
}
