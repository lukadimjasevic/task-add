import { request } from "./request";

const get = async() => {
    return await request("/user", {
        method: "GET",
    });
}

export const user = {
    get,
};
