import { TruncateOptions } from "sequelize";
import { db, server } from "../../../server";
import { UserTests } from "./user";
import { TaskStatusTests } from "./task_status";
import { TaskCategoryTests } from "./task_category";
import { TaskTests } from "./task";
import { TaskCategoryRelationTests } from "./task_category_rel";
import { UserTest } from "../interfaces/user.interface";
import { Category } from "../interfaces/task_category.interface";
import { TaskRequest } from "../interfaces/task.interface";
import Session from "../../../database/models/session.model";
import TaskCategory from "../../../database/models/task_category.model";
import TaskTaskCategoryRel from "../../../database/models/task_task_category_rel.model";
import Task from "../../../database/models/task.model";
import UserOtp from "../../../database/models/user_otp.model";
import User from "../../../database/models/user.model";

const user: UserTest = {
    email: "test.user@gmail.com",
    username: "test",
    password: "strongPassword",
    passwordRetype: "strongPassword",
    firstname: "Test",
    lastname: "User",
    cookie: "",
    verificationCode: null,
};

const taskCategory: Category = {
    color: "#ffffff",
    name: "Work",
};

const task: TaskRequest = {
    deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    name: "Random Task Name",
    description: "Random task description.",
};

const truncateOptions: TruncateOptions = {
    cascade: true,
    restartIdentity: true,
};

describe("REST API V1 --> TESTING", () => {
    beforeAll(async() => {
        try {
            await Session.truncate(truncateOptions);
            await TaskCategory.truncate(truncateOptions);
            await TaskTaskCategoryRel.truncate(truncateOptions);
            await Task.truncate(truncateOptions);
            await UserOtp.truncate(truncateOptions);
            await User.truncate(truncateOptions);
            await db.authenticate();
            server.start();
        } catch (error: any) {
            console.log(error);
        }
    });

    afterAll(async() => {
        try {
            await db.close();
        } catch (error: any) {
            console.log(error);
        }
    });

    const userTests = new UserTests(user);
    const taskStatusTests = new TaskStatusTests(user);
    const taskCategoryTests = new TaskCategoryTests(user, taskCategory);
    const taskTests = new TaskTests(user, task);
    const taskCategoryRelationTests = new TaskCategoryRelationTests(user);

    userTests.run();
    taskStatusTests.run();
    taskCategoryTests.run();
    taskTests.run();
    taskCategoryRelationTests.run();
    /*
    describe("Delete requests", () => {
        taskCategoryRelationTests.testDelete();
        taskCategoryTests.testDelete();
        taskTests.testDelete();
        userTests.testDelete();
    });*/
});
