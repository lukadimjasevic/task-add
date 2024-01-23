import { Request, Response, NextFunction } from "express";
import { TaskBaseService } from "./task-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { TaskRequest } from "../../interfaces/task.interface";
import { TrimData } from "../base-service";
import { HttpErrorInternalServerError } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";


export class TaskServiceCreate extends TaskBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async create(): Promise<Task> {
        const userSession: SessionUserData = this.req.session.user!;
        const taskRequest: TaskRequest = this.req.body;
        const taskStatus = await TaskStatus.findOne({ where: { name: "active" }});
        if (!taskStatus) {
            throw new HttpErrorInternalServerError();
        }
        const task = await Task.create({
            deadlineDate: taskRequest.deadlineDate,
            description: taskRequest.description,
            name: taskRequest.name,
            userId: userSession.id,
            statusId: taskStatus.id,
        });
        return task;
    }
}
