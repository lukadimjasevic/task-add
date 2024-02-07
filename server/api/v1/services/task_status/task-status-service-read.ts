import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import TaskStatus from "../../../../database/models/task_status.model";


export class TaskStatusServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getTaskStatuses(): Promise<TaskStatus[]> {
        const taskStatuses = await TaskStatus.findAll();
        return taskStatuses;
    }
}
