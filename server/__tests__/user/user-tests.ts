import { 
    UserTestSignup, 
    UserTestSignin, 
    UserTestGet, 
    UserTestUpdate,
    UserTestSignout,
    UserTestDelete,
} from "./";
import { UserTest } from "../interfaces/user.interface";


export class UserTests {
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

    run() {
        describe("User", () => {
            new UserTestSignup().test(this.user);
            new UserTestSignin().test(this.user);
            new UserTestGet().test(this.user);
            new UserTestUpdate().test(this.user);
            new UserTestSignout().test(this.user);
            // TODO: Debug and find the issue
            // new UserTestDelete().test(this.user);
        });
    }
}
