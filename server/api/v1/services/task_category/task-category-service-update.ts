import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Category } from "../../interfaces/task_category.interface";
import { HttpErrorNotFound } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceUpdate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateCategory(): Promise<TaskCategory> {
        const userSession = this.getSessionUser();
        const { color, name }: Category = this.req.body;
        const categoryId = this.req.params.categoryId;
        const category = await TaskCategory.findOne({
            where: { id: categoryId, userId: userSession.id },
            attributes: { exclude: ["userId"] },
        });
        if (!category) {
            throw new HttpErrorNotFound("Task category with the given id cannot be found");
        }
        category.color != color ? category.color = color : null;
        category.name != name ? category.name = name : null;
        await category.save();
        return category;
    }
}
