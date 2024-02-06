import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { TaskRequest } from "../../interfaces/task.interface";
import { HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";


export class TaskServiceUpdate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async updateTask(): Promise<Task> {
        const userSession = this.getSessionUser();
        const taskUpdate: TaskRequest = this.req.body;
        const taskId = this.req.params.taskId;
        
        // Finds requested task
        const task = await Task.findOne({
            where: { id: taskId, userId: userSession.id },
            attributes: { exclude: ["userId"] },
        });
        if (!task) {
            throw new HttpErrorNotFound("Task cannot be found");
        }

        // Updates only requested fields
        taskUpdate.deadlineDate !== undefined ? task.deadlineDate = taskUpdate.deadlineDate : null;
        taskUpdate.description !== undefined ? task.description = taskUpdate.description : null;
        taskUpdate.name !== undefined ? task.name = taskUpdate.name : null;

        // Finds and updates requested task status if exists
        if (taskUpdate.status) {
            const status = await TaskStatus.findOne({ where: { name: taskUpdate.status }});
            if (!status) {
                throw new HttpErrorNotFound("Task status cannot be found");
            }
            task.statusId = status.id;
        } 

        await task.save();

        return task;
    }
}
