import pactum, { spec } from "pactum";
import { db, port, server } from "../server";

describe("App e2e-test", () => {
    
    beforeAll((done) => {
        db.truncate({ cascade: true, restartIdentity: true }).then(() => {
            db.authenticate()
                .then(() => {
                    console.log("Database connection has been established successfully");
                    server.start();
                    pactum.request.setBaseUrl(`http://localhost:${port}`);
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done();
                })
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
    });

    describe("User", () => {
        
        const newUser = { 
            email: "test.user@gmail.com",
            username: "test",
            password: "strongPassword",
            passwordRetype: "strongPassword",
            cookie: null,
        };
        const routes = {
            signup: "/api/v1/user/signup",
            signin: "/api/v1/user/signin",
            getUser: "/api/v1/user",
            signout: "/api/v1/user/signout",
        }

        describe(`POST ${routes.signup} -> SIGNUP USER`, () => {
            it("should return status code 400 if the email field is missing", () => {
                return spec()
                    .post(routes.signup)
                    .withJson({
                        username: newUser.username,
                        password: newUser.password,
                        passwordRetype: newUser.passwordRetype,
                    })
                    .expectStatus(400);
            });
            it("should return status code 400 if the username field is missing", () => {
                return spec()
                .post(routes.signup)
                .withJson({
                    email: newUser.email,
                    password: newUser.password,
                    passwordRetype: newUser.passwordRetype,
                })
                .expectStatus(400);
            });
            it("should return status code 400 if the password field is missing", () => {
                return spec()
                .post(routes.signup)
                .withJson({
                    email: newUser.email,
                    username: newUser.username,
                    passwordRetype: newUser.passwordRetype,
                })
                .expectStatus(400);
            });
            it("should return status code 400 if the password retype field is missing", () => {
                return spec()
                .post(routes.signup)
                .withJson({
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                })
                .expectStatus(400);
            });
            it("should return status code 400 if the passwords don't match", () => {
                return spec()
                .post(routes.signup)
                .withJson({
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password,
                    passwordRetype: "wrong_password",
                })
                .expectStatus(400);
            });
            it("should return status code 201 if the user is signed up", () => {
                return spec()
                    .post("/api/v1/user/signup")
                    .withJson(newUser)
                    .expectStatus(201);
            });
            it("should return status code 409 if the user is already signed up", () => {
                return spec()
                    .post("/api/v1/user/signup")
                    .withJson(newUser)
                    .expectStatus(409);
            });
        });

        describe(`POST ${routes.signin} -> SIGNIN USER`, () => {
            it("should return status code 400 if the email field is missing", () => {
                return spec()
                    .post(routes.signin)
                    .withJson({
                        password: newUser.password,
                    })
                    .expectStatus(400);
            });
            it("should return status code 400 if the password field is missing", () => {
                return spec()
                    .post(routes.signin)
                    .withJson({
                        email: newUser.email,
                    })
                    .expectStatus(400);
            });
            it("should return status code 404 if the email is incorrect", async() => {
                newUser.cookie = await spec()
                    .post(routes.signin)
                    .withJson({
                        email: "wrong_email@gmail.com",
                        password: newUser.password,
                    })
                    .returns((ctx) => {
                        return ctx.res.headers["set-cookie"];
                    })
                    .expectStatus(404);
                return;
            });
            it("should return status code 401 if the password is incorrect", async() => {
                newUser.cookie = await spec()
                    .post(routes.signin)
                    .withJson({
                        email: newUser.email,
                        password: "wrong_password",
                    })
                    .returns((ctx) => {
                        return ctx.res.headers["set-cookie"];
                    })
                    .expectStatus(401);
                return;
            });
            it("should return status code 200 if the user is signed in", async() => {
                newUser.cookie = await spec()
                    .post(routes.signin)
                    .withJson({
                        email: newUser.email,
                        password: newUser.password,
                    })
                    .returns((ctx) => {
                        return ctx.res.headers["set-cookie"];
                    })
                    .expectStatus(200);
                return;
            });
        });

        describe(`GET ${routes.getUser} -> GET USER`, () => {
            it("should return status code 200 if the user data is fetched", () => {
                return spec()
                    .get(routes.getUser)
                    .withCookies(newUser.cookie![0])
                    .expectStatus(200);
            });
        });

        describe(`POST ${routes.signout} -> SIGNOUT USER`, () => {
            it("should return status code 204 if the user is signed out", () => {
                return spec()
                    .post(routes.signout)
                    .withCookies(newUser.cookie![0])
                    .expectStatus(204);
            });
        });
    });
});
