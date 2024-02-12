import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";


export class TaskServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteTask(): Promise<void> {
        const user = this.getUser();
        const taskId = this.req.params.taskId;
        
        // Finds the task
        const task = await Task.findOne({ where: { id: taskId, userId: user.id }});
        if (!task) {
            throw new HttpErrorNotFound("Task cannot be found");
        }

        await task.destroy();

        return;
    }
}
