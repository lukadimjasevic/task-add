import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskCategoryServiceDelete } from "../../services/task_category";


export class TaskCategoryControllerDelete extends BaseController {
    services: TaskCategoryServiceDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryServiceDelete(req, res, next);
    }

    async deleteCategory() {
        try {
            await this.services.deleteCategory();
            return this.responses.responseOK("Task category deleted successfully");
        } catch (error: any) {
            return this.next(error);
        }
    }
}
