import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestUpdate extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`PUT ${this.routes.getUser} -> UPDATE USER`, () => {
            it("should return status code 200 if the user data is updated", async() => {
                const response = await request(this.server.app)
                    .put(this.routes.update)
                    .set("Cookie", user.cookie)
                    .send(user);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
