import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { Category } from "../../interfaces/task_category.interface";
import { HttpErrorInternalServerError } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async createCategory(): Promise<TaskCategory> {
        const user = this.getUser();
        const { color, name }: Category = this.req.body;
        const categoryCreate = await TaskCategory.create({
            color: color,
            name: name,
            userId: user.id
        });
        const categoryFind = await TaskCategory.findByPk(categoryCreate.id, {
            attributes: { exclude: ["userId"] },
        });
        if (!categoryFind) {
            throw new HttpErrorInternalServerError();
        }
        return categoryFind;
    }
}
