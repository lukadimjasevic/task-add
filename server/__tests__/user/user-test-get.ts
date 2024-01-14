import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestGet extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`GET ${this.routes.getUser} -> GET USER`, () => {
            it("should return status code 200 if the user data is fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routes.getUser)
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
