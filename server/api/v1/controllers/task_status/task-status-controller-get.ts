import { Request, Response, NextFunction } from "express";
import { TaskStatusBaseController } from "./task-status-base-controller";
import { TaskStatusServiceGet } from "../../services/task_status";


export class TaskStatusControllerGet extends TaskStatusBaseController {
    services: TaskStatusServiceGet;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskStatusServiceGet(req, res, next);
    }

    async getTaskStatuses() {
        try {
            const taskStatuses = await this.services.getTaskStatuses()
            return this.responses.responseOK("Successfully fetched task statuses", { data: taskStatuses });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
