import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskStatusServiceRead } from "../../services/task_status";


export class TaskStatusControllerRead extends BaseController {
    services: TaskStatusServiceRead;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskStatusServiceRead(req, res, next);
    }

    async getTaskStatuses() {
        try {
            const taskStatuses = await this.services.getTaskStatuses();
            return this.responses.responseOK("Successfully fetched task statuses", { data: taskStatuses });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
