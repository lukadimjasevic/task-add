import { TaskCategoryTestCreate } from "./";
import { UserTest } from "../interfaces/user.interface";
import { Category } from "../../api/v1/interfaces/task_category.interface";


export class TaskCategoryTests {
    user: UserTest;
    taskCategory: Category;

    constructor(user: UserTest, taskCategory: Category) {
        this.user = user;
        this.taskCategory = taskCategory;
    };

    run() {
        describe("Task Category", () => {
            new TaskCategoryTestCreate().test(this.user, this.taskCategory);
        });
    }
}
