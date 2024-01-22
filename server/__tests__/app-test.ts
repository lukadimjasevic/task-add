import { db, server } from "../server";
import { BaseTests } from "./base-tests";
import { UserTests } from "./user";
import { TaskStatusTests } from "./task_status";
import { TaskCategoryTests } from "./task_category";


describe("App e2e-test", () => {
    beforeAll((done) => {
        db.truncate({ cascade: true, restartIdentity: true }).then(() => {
            db.authenticate()
                .then(() => {
                    console.log("Database connection has been established successfully");
                    server.start();
                    done();
                })
                .catch((error: any) => {
                    console.log(error);
                    done();
                });
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
    });

    const baseTests = new BaseTests();
    new UserTests(baseTests.user).run();
    new TaskStatusTests(baseTests.user).run();
    new TaskCategoryTests(baseTests.user, baseTests.taskCategory).run();
});
