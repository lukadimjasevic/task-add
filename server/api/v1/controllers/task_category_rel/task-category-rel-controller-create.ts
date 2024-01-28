import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskCategoryRelationServiceCreate } from "../../services/task_category_rel";


export class TaskCategoryRelationControllerCreate extends BaseController {
    services: TaskCategoryRelationServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskCategoryRelationServiceCreate(req, res, next);
    }

    async createRelation() {
        try {
            await this.services.createRelation();
            return this.responses.responseCreated("Successfully added task category to task");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
