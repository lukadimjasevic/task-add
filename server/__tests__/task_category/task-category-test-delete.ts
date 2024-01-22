import request from "supertest";
import { TaskCategoryTestBase } from "./task-category-test-base";
import { UserTest } from "../interfaces/user.interface";


export class TaskCategoryTestDelete extends TaskCategoryTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`DELETE ${this.routes.deleteCategory} -> DELETE TASK CATEGORY`, () => {
            it("should return status code 404 if the task category is not found", async() => {
                const response = await request(this.server.app)
                    .delete(this.routes.deleteCategory + "/2")
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 200 if the task category is deleted", async() => {
                const response = await request(this.server.app)
                    .delete(this.routes.deleteCategory + "/1")
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
