import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskServiceUpdate } from "../../services/task";


export class TaskControllerUpdate extends BaseController {
    services: TaskServiceUpdate;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskServiceUpdate(req, res, next);
    }

    async updateTask() {
        try {
            const task = await this.services.updateTask();
            return this.responses.responseOK("Task updated successfully", { data: task });
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
