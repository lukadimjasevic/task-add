import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getCategories(): Promise<TaskCategory[]> {
        const userSession = this.getSessionUser();
        const categories = await TaskCategory.findAll({
            where: { userId: userSession.id },
            attributes: { exclude: ["userId"] },
        });
        return categories;
    }
}
