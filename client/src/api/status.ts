import { request } from "./request";

const getAll = async() => {
    return await request("/task-status", {
        method: "GET",
    });
};

export const status = {
    getAll,
};
