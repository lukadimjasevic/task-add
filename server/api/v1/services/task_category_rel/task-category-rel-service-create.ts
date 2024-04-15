import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { TaskCategoryRelation } from "../../interfaces/task_category_rel.interface";
import { HttpErrorConflict, HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskCategory from "../../../../database/models/task_category.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskCategoryRelationServiceCreate extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async createRelation(): Promise<TaskTaskCategoryRel> {
        const user = this.getUser();
        const rawData = this.req.query;
        const data: TaskCategoryRelation = {
            taskId: parseInt(rawData.taskId as string),
            categoryId: parseInt(rawData.categoryId as string),
        }

        // Finds requested task
        const task = await Task.findOne({ where: { id: data.taskId, userId: user.id }});
        if (!task) {
            throw new HttpErrorNotFound("Task cannot be found");
        }

        // Finds requested task category
        const category = await TaskCategory.findOne({ where: { id: data.categoryId, userId: user.id }});
        if (!category) {
            throw new HttpErrorNotFound("Task category cannot be found");
        }

        // Creates task category relation if doesn't exist
        const [relation, created] = await TaskTaskCategoryRel.findOrCreate({
            where: {
                taskId: task.id,
                taskCategoryId: category.id,
            },
            defaults: {
                taskId: task.id,
                taskCategoryId: category.id,
            },
        });
        if (!created) {
            throw new HttpErrorConflict("Task category already exists on task");
        }

        return relation;
    }
}
