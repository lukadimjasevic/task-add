import { request } from "./request";

const generate = async() => {
    return await request("/2fa/generate", {
        method: "POST",
    });
}

const enable = async(token: string) => {
    const data = { token };
    return await request("/2fa/enable", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const get = async() => {
    return await request("/2fa", {
        method: "GET",
    });
}

export const otp = {
    generate,
    enable,
    get,
};
