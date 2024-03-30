import { request } from "./request";

const getAll = async() => {
    return await request("/task-category", {
        method: "GET",
    });
};

const create = async(name: string, color: string) => {
    const data = { name, color };
    return await request("/task-category", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const category = {
    getAll,
    create,
};
