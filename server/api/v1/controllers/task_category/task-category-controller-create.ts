import { Request, Response, NextFunction } from "express";
import { TaskCategoryBaseController } from "./task-category-base-controller";
import { TaskCategoryServiceCreate } from "../../services/task_category";


export class TaskCategoryControllerCreate extends TaskCategoryBaseController {
    services: TaskCategoryServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryServiceCreate(req, res, next);
    }

    async createCategory() {
        try {
            const category = await this.services.createCategory();
            return this.responses.responseCreated("Successfully created a new task category", { data: category });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
