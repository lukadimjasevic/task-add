import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteCategory(): Promise<void> {
        const userSession = this.getSessionUser();
        const categoryId = this.req.params.categoryId;
        const category = await TaskCategory.destroy({
            where: { id: categoryId, userId: userSession.id },
        });
        if (!category) {
            throw new HttpErrorNotFound("Task category with the given id cannot be found");
        }
        return;
    }
}
