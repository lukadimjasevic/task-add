import { Request, Response, NextFunction } from "express";
import { TaskStatusBaseService } from "./task-status-base-service";
import { TrimData } from "../base-service";
import TaskStatus from "../../../../database/models/task_status.model";


export class TaskStatusServiceRead extends TaskStatusBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getTaskStatuses(): Promise<TrimData[]> {
        const dataValues: TrimData[] = [];
        const taskStatuses = await TaskStatus.findAll();
        taskStatuses.forEach((taskStatus) => {
            dataValues.push(this.trimData(taskStatus.dataValues));
        });
        return dataValues;
    }
}
