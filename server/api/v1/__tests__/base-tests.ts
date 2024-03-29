import { server, Server } from "../../../server";
import { UserTest } from "../interfaces/user.interface";
import { Category } from "../interfaces/task_category.interface";
import { TaskRequest } from "../interfaces/task.interface";


export class BaseTests {
    readonly routesUser = {
        signup: "/api/v1/user/signup",
        signin: "/api/v1/user/signin",
        signout: "/api/v1/user/signout",
        verifyGenerate: "/api/v1/user/verify-generate",
        verifyValidate: "/api/v1/user/verify-validate",
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
        update: "/api/v1/task",
        delete: "/api/v1/task",
    };
    readonly routesTaskCategoryRelation = {
        create: "/api/v1/task-category-relation",
        delete: "/api/v1/task-category-relation",
    };
    readonly routesUserOtp = {
        enable: "/api/v1/2fa/enable",
        verify: "/api/v1/2fa/verify",
        read: "/api/v1/2fa",
        delete: "/api/v1/2fa",
    };
    
    server: Server = server;
    
    user: UserTest;
    taskCategory: Category;
    task: TaskRequest;

    constructor() {}
}
