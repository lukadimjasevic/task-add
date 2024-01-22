import request from "supertest";
import { TaskCategoryTestBase } from "./task-category-test-base";
import { UserTest } from "../interfaces/user.interface";


export class TaskCategoryTestRead extends TaskCategoryTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`GET ${this.routes.readCategories} -> GET TASK CATEGORIES`, () => {
            it("should return status code 200 if task categories are fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routes.readCategories)
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
