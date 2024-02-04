import { server, Server } from "../../../server";
import { UserTest } from "../interfaces/user.interface";
import { Category } from "../interfaces/task_category.interface";


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
    
    server: Server = server;
    
    user: UserTest;
    taskCategory: Category;

    constructor() {}
}
