import { server, Server } from "../../server";


export class TaskStatusTestBase {
    readonly routes = {
        getTaskStatuses: "/api/v1/task-status",
    };
    server: Server = server;
}
