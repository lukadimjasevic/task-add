import { request } from "./request";

const signUp = async(email: string, username: string, password: string, passwordRetype: string) => {
    const data = { email, username, password, passwordRetype };
    return await request("/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const signIn = async(email: string, password: string) => {
    const data = { email, password };
    return await request("/user/signin", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const auth = {
    signUp,
    signIn,
};
