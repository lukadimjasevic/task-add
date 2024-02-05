import { server, Server } from "../../../server";
import { UserTest } from "../interfaces/user.interface";
import { Category } from "../interfaces/task_category.interface";
import { TaskRequest } from "../interfaces/task.interface";


export class BaseTests {
    readonly routesUser = {
        signup: "/api/v1/user/signup",
        signin: "/api/v1/user/signin",
        signout: "/api/v1/user/signout",
        read: "/api/v1/user",
        update: "/api/v1/user",
        delete: "/api/v1/user",
    };
    readonly routesTaskStatus = {
        read: "/api/v1/task-status",
    };
    readonly routesTaskCategory = {
        create: "/api/v1/task-category",
        read: "/api/v1/task-category",
        update: "/api/v1/task-category",
        delete: "/api/v1/task-category",
    };
    readonly routesTask = {
        create: "/api/v1/task",
        readAll: "/api/v1/task",
        readOne: "/api/v1/task",
    }
    
    server: Server = server;
    
    user: UserTest;
    taskCategory: Category;
    task: TaskRequest;

    constructor() {}
}
