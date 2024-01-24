import { Request, Response, NextFunction } from "express";
import { TaskBaseService } from "./task-base-service";
import { SessionUserData } from "../../interfaces/types/express-session";
import { TaskRequest } from "../../interfaces/task.interface";
import { HttpErrorInternalServerError } from "../../helpers/error";
import Task from "../../../../database/models/task.model";
import TaskStatus from "../../../../database/models/task_status.model";
import TaskCategory from "../../../../database/models/task_category.model";
import TaskTaskCategoryRel from "../../../../database/models/task_task_category_rel.model";


export class TaskServiceCreate extends TaskBaseService {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    async create(): Promise<Task> {
        const userSession: SessionUserData = this.req.session.user!;
        const taskRequest: TaskRequest = this.req.body;
        const taskStatus = await TaskStatus.findOne({ where: { name: "active" }});
        if (!taskStatus) {
            throw new HttpErrorInternalServerError();
        }
        const task = await Task.create({
            deadlineDate: taskRequest.deadlineDate,
            description: taskRequest.description,
            name: taskRequest.name,
            userId: userSession.id,
            statusId: taskStatus.id,
        });
        await this.connectTaskCategories(task.id);
        return task;
    }

    private async createTaskCategoryRelation(taskId: number, categoryId: number): Promise<TaskTaskCategoryRel> {
        const relation = await TaskTaskCategoryRel.create({
            taskId: taskId,
            taskCategoryId: categoryId,
        });
        return relation;
    }
 
    private async connectTaskCategories(taskId: number): Promise<void> {
        const userSession: SessionUserData = this.req.session.user!;
        const { categoryIds }: TaskRequest = this.req.body;
        if (!categoryIds) {
            return;
        }
        categoryIds.forEach(async(categoryId) => {
            const category = await TaskCategory.findOne({
                where: {
                    id: categoryId, 
                    userId: userSession.id
                }
            });
            if (!category) {
                return;
            }
            await this.createTaskCategoryRelation(taskId, category.id);
        });
    }
}
