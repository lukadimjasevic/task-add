import {
    TaskCategoryTestCreate, 
    TaskCategoryTestRead,
    TaskCategoryTestUpdate,
} from "./";
import { UserTest } from "../interfaces/user.interface";
import { CategoryCreate } from "../../api/v1/interfaces/task_category.interface";


export class TaskCategoryTests {
    user: UserTest;
    taskCategory: CategoryCreate;

    constructor(user: UserTest, taskCategory: CategoryCreate) {
        this.user = user;
        this.taskCategory = taskCategory;
    }

    run() {
        describe("Task Category", () => {
            new TaskCategoryTestCreate().test(this.user, this.taskCategory);
            new TaskCategoryTestRead().test(this.user);
            new TaskCategoryTestUpdate().test(this.user);
        });
    }
}
