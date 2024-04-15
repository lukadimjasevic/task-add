import { request } from "./request";
import type { Response } from "taskadd/response";

const generate = async(): Promise<Response> => {
    return await request("/2fa/generate", {
        method: "POST",
    });
}

const enable = async(token: string): Promise<Response> => {
    const data = { token };
    return await request("/2fa/enable", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const get = async(): Promise<Response> => {
    return await request("/2fa", {
        method: "GET",
    });
}

const disable = async(): Promise<Response> => {
    return await request("/2fa", {
        method: "DELETE",
    });
}

export const otp = {
    generate,
    enable,
    get,
    disable,
};
