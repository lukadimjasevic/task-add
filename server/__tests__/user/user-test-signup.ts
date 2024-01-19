import request from "supertest";
import { UserTestBase } from "./user-test-base";
import { UserTest } from "../interfaces/user.interface";


export class UserTestSignup extends UserTestBase {
    constructor() {
        super();
    }

    test(user: UserTest) {     
        describe(`POST ${this.routes.signup} -> SIGNUP USER`, () => {
            it("should return status code 400 if the email field is missing", async() => {
                const { email, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the username field is missing", async() => {
                const { username, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password field is missing", async() => {
                const { password, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password retype field is missing", async() => {
                const { passwordRetype, ...data } = user;
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the passwords don't match", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send({...user, passwordRetype: "wrong_password"});
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if the user is signed up", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(user);
                expect(response.statusCode).toEqual(201);
            });
            it("should return status code 409 if the user is already signed up", async() => {
                const response = await request(this.server.app)
                    .post(this.routes.signup)
                    .send(user);
                expect(response.statusCode).toEqual(409);
            });
        });
    }
}
