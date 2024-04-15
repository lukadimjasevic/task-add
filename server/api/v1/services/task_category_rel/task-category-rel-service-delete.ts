import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { TaskCategoryRelation } from "../../interfaces/task_category_rel.interface";
import { HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskCategoryRelationServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteRelation(): Promise<void> {
        const user = this.getUser();
        const rawData = this.req.query;
        const data: TaskCategoryRelation = {
            taskId: parseInt(rawData.taskId as string),
            categoryId: parseInt(rawData.categoryId as string),
        }

        // Finds the task category relation
        const relation = await TaskTaskCategoryRel.findOne({
            where: {
                taskId: data.taskId,
                taskCategoryId: data.categoryId,
            },
        });
        if (!relation) {
            throw new HttpErrorNotFound("Task category relation cannot be found");
        }

        // Finds the task from a relation and checks if the user owns it
        const task = await Task.findOne({ where: { id: relation.taskId, userId: user.id }});
        if (!task) {
            throw new HttpErrorNotFound("Task category relation cannot be found");
        }

        await relation.destroy();

        return;
    }
}
