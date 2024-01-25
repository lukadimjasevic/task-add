import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskServiceCreate } from "../../services/task";


export class TaskControllerCreate extends BaseController {
    services: TaskServiceCreate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskServiceCreate(req, res, next);
    }

    async createTask() {
        try {
            const task = await this.services.createTask();
            return this.responses.responseCreated("Successfully created a new task", { data: task });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
