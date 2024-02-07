import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { TaskRequest } from "../../interfaces/task.interface";
import { HttpErrorInternalServerError } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";


export class TaskServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async createTask(): Promise<Task> {
        const user = this.getUser();
        const taskRequest: TaskRequest = this.req.body;
        
        // Finds task status
        const taskStatus = await TaskStatus.scope("active").findOne();
        if (!taskStatus) {
            console.log("Cannot find the task status");
            throw new HttpErrorInternalServerError();
        }

        const task = await Task.create({
            deadlineDate: taskRequest.deadlineDate,
            description: taskRequest.description,
            name: taskRequest.name,
            userId: user.id,
            statusId: taskStatus.id,
        });

        return task;
    }
}
