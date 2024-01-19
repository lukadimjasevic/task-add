import { TaskStatusTestGet } from "./";
import { UserTest } from "../interfaces/user.interface";


export class TaskStatusTests {
    user: UserTest;

    constructor(user: UserTest) {
        this.user = user;
    };

    run() {
        describe("Task Status", () => {
            new TaskStatusTestGet().test(this.user);
        });
    }
}
