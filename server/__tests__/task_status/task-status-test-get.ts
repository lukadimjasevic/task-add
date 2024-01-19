import request from "supertest";
import { TaskStatusTestBase } from "./task-status-test-base";
import { UserTest } from "../interfaces/user.interface";


export class TaskStatusTestGet extends TaskStatusTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`GET ${this.routes.getTaskStatuses} -> GET TASK STATUSES`, () => {
            it("should return status code 200 if the task statuses are fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routes.getTaskStatuses)
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
