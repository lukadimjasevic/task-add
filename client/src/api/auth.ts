import { request } from "./request";

const signup = async(email: string, username: string, password: string, passwordRetype: string) => {
    const data = { email, username, password, passwordRetype };
    return await request("/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const signin = async(email: string, password: string) => {
    const data = { email, password };
    return await request("/user/signin", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const signout = async() => {
    return await request("/user/signout", {
        method: "POST",
    });
};

export const auth = {
    signup,
    signin,
    signout,
};
