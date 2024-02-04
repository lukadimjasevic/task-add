import request from "supertest";
import { BaseTests } from "../base-tests";
import { UserTest } from "../../interfaces/user.interface";


export class UserTests extends BaseTests {
    constructor(user: UserTest) {
        super();
        this.user = user;
    }

    run() {
        describe("User", () => {
            this.testSignup();
            this.testSignin();
            this.testRead();
            this.testUpdate();
            // TODO: Debug and find the issue with signout
            // this.testSignout();
            // this.testDelete();
        });
    }

    private testSignup() {
        describe(`POST ${this.routesUser.signup} -> SIGNUP USER`, () => {
            it("should return status code 400 if the email field is missing", async() => {
                const { email, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the username field is missing", async() => {
                const { username, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password field is missing", async() => {
                const { password, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password retype field is missing", async() => {
                const { passwordRetype, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the passwords don't match", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send({...this.user, passwordRetype: "wrong_password"});
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 201 if the user is signed up", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(this.user);
                expect(response.statusCode).toEqual(201);
            });
            it("should return status code 409 if the user is already signed up", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signup)
                    .send(this.user);
                expect(response.statusCode).toEqual(409);
            });
        });
    }

    private testSignin() {
        describe(`POST ${this.routesUser.signin} -> SIGNIN USER`, () => {
            it("should return status code 400 if the email field is missing", async() => {
                const { email, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 400 if the password field is missing", async() => {
                const { password, ...data } = this.user;
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send(data);
                expect(response.statusCode).toEqual(400);
            });
            it("should return status code 404 if the email is incorrect", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send({ ...this.user, email: "wrong_email@gmail.com" });
                expect(response.statusCode).toEqual(404);
            });
            it("should return status code 401 if the password is incorrect", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send({ ...this.user, password: "wrong_password" });
                expect(response.statusCode).toEqual(401);
            });
            it("should return status code 200 if the user is signed in", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send(this.user);
                this.user.cookie = response.headers["set-cookie"];
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testSignout() {
        describe(`POST ${this.routesUser.signout} -> SIGNOUT USER`, () => {
            it("should return status code 200 if the user is signed out", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signout)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });

        describe(`POST ${this.routesUser.signin} -> SIGNIN USER AGAIN`, () => {
            it("should return status code 200 if the user is signed in again", async() => {
                const response = await request(this.server.app)
                    .post(this.routesUser.signin)
                    .send(this.user);
                this.user.cookie = response.headers["set-cookie"];
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testRead() {
        describe(`GET ${this.routesUser.read} -> GET USER`, () => {
            it("should return status code 200 if the user data is fetched", async() => {
                const response = await request(this.server.app)
                    .get(this.routesUser.read)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testUpdate() {
        describe(`PUT ${this.routesUser.update} -> UPDATE USER`, () => {
            it("should return status code 200 if the user data is updated", async() => {
                const response = await request(this.server.app)
                    .put(this.routesUser.update)
                    .set("Cookie", this.user.cookie)
                    .send(this.user);
                expect(response.statusCode).toEqual(200);
            });
        });
    }

    private testDelete() {
        describe(`DELETE ${this.routesUser.delete} -> DELETE USER`, () => {
            it("should return status code 200 if the user is deleted", async() => {
                const response = await request(this.server.app)
                    .delete(this.routesUser.delete)
                    .set("Cookie", this.user.cookie);
                expect(response.statusCode).toEqual(200);
            });
        });
    }
}
