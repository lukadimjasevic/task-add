import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskCategoryRelationServiceDelete } from "../../services/task_category_rel";


export class TaskCategoryRelationControllerDelete extends BaseController {
    services: TaskCategoryRelationServiceDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryRelationServiceDelete(req, res, next);
    }

    async deleteRelation() {
        try {
            await this.services.deleteRelation();
            return this.responses.responseOK("Task category deleted successfully");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
