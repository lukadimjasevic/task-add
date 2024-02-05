import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";
import { TaskRequest } from "../../interfaces/task.interface";


export class TaskTests extends BaseTests {
    constructor(user: UserTest, task: TaskRequest) {
        super();
        this.user = user;
        this.task = task;
    }

    run() {
        describe("Task", () => {
            this.testCreate();
            this.readAll();
            this.readOne();
        });
    }

    private testCreate() {
        describe(`POST ${this.routesTask.create} -> CREATE A NEW TASK`, () => {
            it("should return status code 400 if the deadline date field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        name: this.task.name,
                        description: this.task.description,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the deadline date field isn't a date", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: "Invalid type",
                        name: this.task.name,
                        description: this.task.description,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the deadline date field is in the past", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: new Date(2020, 1, 1),
                        name: this.task.name,
                        description: this.task.description,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is missing", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: this.task.deadlineDate,
                        description: this.task.description,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field isn't a string", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: this.task.deadlineDate,
                        description: this.task.description,
                        name: 1,
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is over 64 characters", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: this.task.deadlineDate,
                        description: this.task.description,
                        name: "randomtextrandomtextrandomtextrandomtextrandomtextrandomtextrandomtext",
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the name field is below 4 characters", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send({
                        deadlineDate: this.task.deadlineDate,
                        description: this.task.description,
                        name: "",
                    });
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if a new task is created", async() => {
                const response = await request(this.server.app)
                    .post(this.routesTask.create)
                    .set("Cookie", this.user.cookie)
                    .send(this.task);
                expect(response.statusCode).toEqual(201);
            });
        });
    }

    private readAll() {
        describe(`GET ${this.routesTask.readAll} -> GET ALL TASKS`, () => {
            it("should return status code 200 if tasks are fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesTask.readAll)
                    .set("Cookie", this.user.cookie)
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private readOne() {
        describe(`GET ${this.routesTask.readOne} -> GET ONE TASK`, () => {
            it("should return status code 200 if the task is fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesTask.readOne + "/1")
                    .set("Cookie", this.user.cookie)
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
