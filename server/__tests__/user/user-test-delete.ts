import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestDelete extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`DELETE ${this.routes.delete} -> DELETE USER`, () => {
            it("should return status code 200 if the user is deleted", async() => {
                const response = await request(this.server.app)
                    .delete(this.routes.delete)
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
