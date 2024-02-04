import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";


export class TaskStatusTests extends BaseTests {
    constructor(user: UserTest) {
        super();
        this.user = user;
    }

    run() {
        describe("Task Status", () => {
            this.testRead();
        });
    }

    private testRead() {
        describe(`GET ${this.routesTaskStatus.read} -> GET TASK STATUSES`, () => {
            it("should return status code 200 if the task statuses are fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesTaskStatus.read)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
