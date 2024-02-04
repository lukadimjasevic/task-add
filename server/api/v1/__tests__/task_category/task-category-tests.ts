import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";
import { Category } from "../../interfaces/task_category.interface";


export class TaskCategoryTests extends BaseTests {
    constructor(user: UserTest, taskCategory: Category) {
        super();
        this.user = user;
        this.taskCategory = taskCategory;
    }

    run() {
        describe("Task Category", () => {
            this.testCreate();
            this.testRead();
            this.testUpdate();
            this.testDelete();
        });
    }

    private testCreate() {
        describe(`POST ${this.routesTaskCategory.create} -> CREATE A NEW TASK CATEGORY`, () => {
            it("should return status code 400 if the color field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        name: this.taskCategory.name,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the color field isn't a hex", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        color: "color",
                        name: this.taskCategory.name,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        color: this.taskCategory.color,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field isn't a string", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        color: this.taskCategory.color,
                        name: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is over 64 characters", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        color: this.taskCategory.color,
                        name: "randomtextrandomtextrandomtextrandomtextrandomtextrandomtextrandomtext",
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if a new task category is created", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategory.create)
                    .set("Cookie", this.user.cookie)
                    .send(this.taskCategory);
                expect(response.statusCode).toEqual(201);
            });
        });
    }

    private testRead() {
        describe(`GET ${this.routesTaskCategory.read} -> GET TASK CATEGORIES`, () => {
            it("should return status code 200 if task categories are fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesTaskCategory.read)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testUpdate() {
        describe(`PUT ${this.routesTaskCategory.update} -> UPDATE TASK CATEGORY`, () => {
            it("should return status code 404 if the task category is not found", async() => {
                const response = await request(this.server.app)
                    .put(this.routesTaskCategory.update + "/2")
                    .set("Cookie", this.user.cookie)
                    .send({
                        name: "School",
                        color: "#ffffff",
                    });
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 200 if the task category is updated", async() => {
                const response = await request(this.server.app)
                    .put(this.routesTaskCategory.update + "/1")
                    .set("Cookie", this.user.cookie)
                    .send({
                        name: "School",
                        color: "#ffffff",
                    });
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testDelete() {
        describe(`DELETE ${this.routesTaskCategory.delete} -> DELETE TASK CATEGORY`, () => {
            it("should return status code 404 if the task category is not found", async() => {
                const response = await request(this.server.app)
                    .delete(this.routesTaskCategory.delete + "/2")
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 200 if the task category is deleted", async() => {
                const response = await request(this.server.app)
                    .delete(this.routesTaskCategory.delete + "/1")
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
