import { UserTest } from "./interfaces/user.interface";
import { CategoryCreate } from "../api/v1/interfaces/task_category.interface";


export class BaseTests {
    user: UserTest;
    taskCategory: CategoryCreate;

    constructor() {
        this.user = {
            email: "test.user@gmail.com",
            username: "test",
            password: "strongPassword",
            passwordRetype: "strongPassword",
            firstname: "Test",
            lastname: "User",
            cookie: "",
        };
        this.taskCategory = {
            color: "#ffffff",
            name: "Work",
        };
    }
}
