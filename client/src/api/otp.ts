import { request } from "./request";
import type { UserOTPVerifyDTO } from "taskadd/user-otp";

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

const verify = async(dto: UserOTPVerifyDTO) => {
    return await request("/2fa/verify", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

const get = async() => {
    return await request("/2fa", {
        method: "GET",
    });
}

const disable = async() => {
    return await request("/2fa", {
        method: "DELETE",
    });
}

export const otp = {
    generate,
    enable,
    verify,
    get,
    disable,
};
