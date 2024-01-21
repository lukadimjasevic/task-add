import { server, Server } from "../../server";


export class TaskCategoryTestBase {
    readonly routes = {
        createCategory: "/api/v1/task-category",
    }
    server: Server = server;
}
