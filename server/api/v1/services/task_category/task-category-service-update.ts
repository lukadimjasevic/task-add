import { Request, Response, NextFunction } from "express";
import { TaskCategoryBaseService } from "./task-category-base-service";
import { CategoryUpdate } from "../../interfaces/task_category.interface";
import { TrimData } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import TaskCategory from "../../../../database/models/task_category.model";


export class TaskCategoryServiceUpdate extends TaskCategoryBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateCategory(): Promise<TrimData> {
        const { id, color, name }: CategoryUpdate = this.req.body;
        const category = await TaskCategory.findByPk(id);
        if (!category) {
            throw new HttpErrorNotFound("Task category with the given id cannot be found");
        }
        category.color != color ? category.color = color : null;
        category.name != name ? category.name = name : null;
        category.save();
        return this.trimData(category.dataValues);
    }
}
