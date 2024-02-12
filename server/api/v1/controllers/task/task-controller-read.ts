import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskServiceRead } from "../../services/task";


export class TaskControllerRead extends BaseController {
    services: TaskServiceRead;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskServiceRead(req, res, next);
    }

    async getAll() {
        try {
            const tasks = await this.services.getAll();
            return this.responses.responseOK("Successfully fetched all tasks", { data: tasks });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }

    async getOne() {
        try {
            const task = await this.services.getOne();
            return this.responses.responseOK("Task successfully fetched", { data: task });
        } catch (error: any) {
            return this.next(error);
        }
    }
}
