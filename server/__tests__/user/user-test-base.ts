import { server, Server } from "../../server";


export class UserTestBase {
    readonly routes = {
        signup: "/api/v1/user/signup",
        signin: "/api/v1/user/signin",
        getUser: "/api/v1/user",
        signout: "/api/v1/user/signout",
        update: "/api/v1/user",
        delete: "/api/v1/user",
    };
    server: Server = server;
}
