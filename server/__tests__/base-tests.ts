import { UserTest } from "./interfaces/user.interface";


export class BaseTests {
    user: UserTest;

    constructor() {
        this.user = {
            email: "test.user@gmail.com",
            username: "test",
            password: "strongPassword",
            passwordRetype: "strongPassword",
            firstname: "Test",
            lastname: "User",
            cookie: "",
        }
    };
}
