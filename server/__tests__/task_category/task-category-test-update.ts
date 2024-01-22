import request from "supertest";
import { TaskCategoryTestBase } from "./task-category-test-base";
import { UserTest } from "../interfaces/user.interface";


export class TaskCategoryTestUpdate extends TaskCategoryTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`PUT ${this.routes.updateCategory} -> UPDATE TASK CATEGORY`, () => {
            it("should return status code 404 if the task category is not found", async() => {
                const response = await request(this.server.app)
                    .put(this.routes.updateCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        id: 2,
                        name: "School",
                        color: "#ffffff",
                    });
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 200 if the task category is updated", async() => {
                const response = await request(this.server.app)
                    .put(this.routes.updateCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        id: 1,
                        name: "School",
                        color: "#ffffff",
                    });
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
