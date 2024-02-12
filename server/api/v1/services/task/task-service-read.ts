import { Request, Response, NextFunction } from "express";
import { BaseService } from "../base-service";
import { HttpErrorNotFound } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";
import TaskCategory from "../../../../database/models/task_category.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskServiceRead extends BaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getAll(): Promise<Task[]> {
        const user = this.getSessionUser();
        const tasks = await Task.findAll({
            where: { userId: user.id },
            attributes: { exclude: ["userId", "statusId"]},
            include: [
                {
                    model: TaskStatus, 
                    as: "status", 
                    attributes: {
                        exclude: ["id"],
                    },
                },
            ],
        });

        for (const task of tasks) {
            const categories = await this.getCategories(task.id);
            task.dataValues.categories = categories;
        }

        return tasks;
    }

    async getOne(): Promise<Task> {
        const user = this.getUser();
        const taskId = this.req.params.taskId;
        const task = await Task.findOne({
            where: { id: taskId, userId: user.id },
            attributes: { exclude: ["userId", "statusId"]},
            include: [
                {
                    model: TaskStatus, 
                    as: "status", 
                    attributes: {
                        exclude: ["id"],
                    },
                },
            ],
        });

        if (!task) {
            throw new HttpErrorNotFound("Task cannot be found");
        }

        const categories = await this.getCategories(task.id);
        task.dataValues.categories = categories;

        return task;
    }

    private async getCategories(taskId: number): Promise<TaskCategory[]> {
        const categoryRelations = await TaskTaskCategoryRel.findAll({
            where: { taskId: taskId },
            attributes: [],
            include: {
                model: TaskCategory,
                as: "categories",
                attributes: {
                    exclude: ["id", "userId"],
                },
            },
        });

        return categoryRelations.map((relation) => relation.categories);
    }
}
