import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestSignout extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`POST ${this.routes.signout} -> SIGNOUT USER`, () => {
            it("should return status code 200 if the user is signed out", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signout)
                    .set("Cookie", user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });

        describe(`POST ${this.routes.signin} -> SIGNIN USER AGAIN`, () => {
            it("should return status code 200 if the user is signed in again", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send(user);
                user.cookie = response.headers['set-cookie'];
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
