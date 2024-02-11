import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskCategoryServiceUpdate } from "../../services/task_category";


export class TaskCategoryControllerUpdate extends BaseController {
    services: TaskCategoryServiceUpdate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryServiceUpdate(req, res, next);
    }

    async updateCategory() {
        try {
            const category = await this.services.updateCategory();
            return this.responses.responseOK("Task category updated successfully", { data: category });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
