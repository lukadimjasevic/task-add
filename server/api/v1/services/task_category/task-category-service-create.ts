import { Request, Response, NextFunction } from "express";
import { TaskCategoryBaseService } from "./task-category-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { CategoryCreate } from "../../interfaces/task_category.interface";
import { TrimData } from "../base-service";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceCreate extends TaskCategoryBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async createCategory(): Promise<TrimData> {
        const userSession: SessionUserData = this.req.session.user!;
        const { color, name }: CategoryCreate = this.req.body;
        const category = await TaskCategory.create({ color, name, userId: userSession.id });
        return this.trimData(category.dataValues);
    }
}
