import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";
import { TaskRequest } from "../../interfaces/task.interface";


export class TaskCategoryRelationTests extends BaseTests {
    constructor(user: UserTest) {
        super();
        this.user = user;
    }

    run() {
        describe("Task Category Relation", () => {
            this.testCreate();
        });
    }

    testCreate() {
        describe(`POST ${this.routesTaskCategoryRelation.create} -> CREATE A NEW TASK CATEGORY RELATION`, () => {
            it("should return status code 400 if the task id field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        categoryId: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the task id field is null", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        taskId: null,
                        categoryId: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the category id field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        taskId: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the category id field is null", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        taskId: 1,
                        categoryId: null,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if a new task category relation is created", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        taskId: 1,
                        categoryId: 1,
                    });
                expect(response.statusCode).toEqual(201);
            });
            it("should return status code 409 if task category relation already exists", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTaskCategoryRelation.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        taskId: 1,
                        categoryId: 1,
                    });
                expect(response.statusCode).toEqual(409);
            });
        });
    }
}
