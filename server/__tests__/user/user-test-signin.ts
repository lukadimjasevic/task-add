import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestSignin extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`POST ${this.routes.signin} -> SIGNIN USER`, () => {
            it("should return status code 400 if the email field is missing", async() => {
                const { email, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password field is missing", async() => {
                const { password, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 404 if the email is incorrect", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send({ ...user, email: "wrong_email@gmail.com" });
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 401 if the password is incorrect", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send({ ...user, password: "wrong_password" });
                expect(response.statusCode).toEqual(401);
            });
            it("should return status code 200 if the user is signed in", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signin)
                    .send(user);
                user.cookie = response.headers["set-cookie"];
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
