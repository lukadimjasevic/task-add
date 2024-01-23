import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { TaskCategoryBaseService } from "./task-category-base-service";
import { Category } from "../../interfaces/task_category.interface";
import { TrimData } from "../base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { HttpErrorNotFound } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceUpdate extends TaskCategoryBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateCategory(): Promise<TrimData> {
        const userSession: SessionUserData = this.req.session.user!;
        const { color, name }: Category = this.req.body;
        const categoryId = this.req.params.categoryId;
        const category = await TaskCategory.findOne({ where: {
            [Op.and]: [
                { id: categoryId },
                { userId: userSession.id },
            ],
        }});
        if (!category) {
            throw new HttpErrorNotFound("Task category with the given id cannot be found");
        }
        category.color != color ? category.color = color : null;
        category.name != name ? category.name = name : null;
        await category.save();
        return this.trimData(category.dataValues);
    }
}
