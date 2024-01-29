import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base-controller";
import { TaskServiceDelete } from "../../services/task";


export class TaskControllerDelete extends BaseController {
    services: TaskServiceDelete;

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
        this.services = new TaskServiceDelete(req, res, next);
    }

    async deleteTask() {
        try {
            await this.services.deleteTask();
            return this.responses.responseOK("Task deleted successfully");
        } catch (error: any) {
            console.log(error);
            return this.next(error);
        }
    }
}
