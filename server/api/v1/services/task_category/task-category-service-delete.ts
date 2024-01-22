import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { TaskCategoryBaseService } from "./task-category-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceDelete extends TaskCategoryBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteCategory(): Promise<void> {
        const userSession: SessionUserData = this.req.session.user!;
        const categoryId = this.req.params.categoryId;
        const category = await TaskCategory.destroy({ where: {
            [Op.and]: [
                { id: categoryId },
                { userId: userSession.id },
            ],
        }});
        if (!category) {
            throw new HttpErrorNotFound("Task category with the given id cannot be found");
        }
        return;
    }
}
