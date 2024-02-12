import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskCategoryRelationServiceDelete extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async deleteRelation(): Promise<void> {
        const user = this.getUser();
        const relationId = this.req.params.relationId;

        // Finds the task category relation
        const relation = await TaskTaskCategoryRel.findByPk(relationId);
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
