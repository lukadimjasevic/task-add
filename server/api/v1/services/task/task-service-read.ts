import { Request, Response, NextFunction } from "express";
import { TaskBaseService } from "./task-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";
import TaskCategory from "../../../../database/models/task_category.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskServiceRead extends TaskBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async getAll(): Promise<Task[]> {
        const userSession: SessionUserData = this.req.session.user!;
        const tasks = await Task.findAll({
            where: { userId: userSession.id },
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
