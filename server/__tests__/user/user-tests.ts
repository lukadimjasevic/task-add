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

    constructor(user: UserTest) {
        this.user = user;
    }

    run() {
        describe("User", () => {
            new UserTestSignup().test(this.user);
            new UserTestSignin().test(this.user);
            new UserTestGet().test(this.user);
            new UserTestUpdate().test(this.user);
            // TODO: Debug and find the issue with signout
            // new UserTestSignout().test(this.user);
            // new UserTestDelete().test(this.user);
        });
    }
}
