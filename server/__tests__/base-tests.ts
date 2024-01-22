import { UserTest } from "./interfaces/user.interface";
import { Category } from "../api/v1/interfaces/task_category.interface";


export class BaseTests {
    user: UserTest;
    taskCategory: Category;

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
