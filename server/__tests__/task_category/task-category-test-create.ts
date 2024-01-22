import request from "supertest";
import { TaskCategoryTestBase } from "./task-category-test-base";
import { UserTest } from "../interfaces/user.interface";
import { CategoryCreate } from "../../api/v1/interfaces/task_category.interface";


export class TaskCategoryTestCreate extends TaskCategoryTestBase {
    constructor() {
        super();
    }

    test(user: UserTest, taskCategory: CategoryCreate) {     
        describe(`POST ${this.routes.createCategory} -> CREATE A NEW TASK CATEGORY`, () => {
            it("should return status code 400 if the color field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        name: taskCategory.name,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the color field isn't a hex", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        color: "color",
                        name: taskCategory.name,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        color: taskCategory.color,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field isn't a string", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        color: taskCategory.color,
                        name: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is over 64 characters", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send({
                        color: taskCategory.color,
                        name: "randomtextrandomtextrandomtextrandomtextrandomtextrandomtextrandomtext",
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if a new task category is created", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.createCategory)
                    .set("Cookie", user.cookie)
                    .send(taskCategory);
                expect(response.statusCode).toEqual(201);
            });
        });
    }
}
