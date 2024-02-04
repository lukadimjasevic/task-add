import { db, server } from "../../../server";
import { UserTests } from "./user";
import { UserTest } from "../interfaces/user.interface";
import { TaskStatusTests } from "./task_status";
import { TaskCategoryTests } from "./task_category";
import { Category } from "../interfaces/task_category.interface";

const user: UserTest = {
    email: "test.user@gmail.com",
    username: "test",
    password: "strongPassword",
    passwordRetype: "strongPassword",
    firstname: "Test",
    lastname: "User",
    cookie: "",
};

const taskCategory: Category = {
    color: "#ffffff",
    name: "Work",
};

describe("REST API --> TESTING", () => {
    beforeAll(async() => {
        try {
            await db.truncate({ cascade: true, restartIdentity: true });
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

    new UserTests(user).run();
    new TaskStatusTests(user).run();
    new TaskCategoryTests(user, taskCategory).run();
});
