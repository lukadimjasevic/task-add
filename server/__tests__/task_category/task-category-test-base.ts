import { server, Server } from "../../server";


export class TaskCategoryTestBase {
    readonly routes = {
        createCategory: "/api/v1/task-category",
        readCategories: "/api/v1/task-category",
        updateCategory: "/api/v1/task-category",
        deleteCategory: "/api/v1/task-category",
    };
    server: Server = server;
}
