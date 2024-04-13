import { request } from "./request";
import type { Response } from "taskadd/response";

const signup = async(email: string, username: string, password: string, passwordRetype: string): Promise<Response> => {
    const data = { email, username, password, passwordRetype };
    return await request("/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const signin = async(email: string, password: string): Promise<Response> => {
    const data = { email, password };
    return await request("/user/signin", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const signout = async(): Promise<Response> => {
    return await request("/user/signout", {
        method: "POST",
    });
};

export const auth = {
    signup,
    signin,
    signout,
};
