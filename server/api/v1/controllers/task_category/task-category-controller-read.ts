import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskCategoryServiceRead } from "../../services/task_category";


export class TaskCategoryControllerRead extends BaseController {
    services: TaskCategoryServiceRead;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryServiceRead(req, res, next);
    }

    async getCategories() {
        try {
            const categories = await this.services.getCategories();
            return this.responses.responseOK("Successfully fetched task categories", { data: categories });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
