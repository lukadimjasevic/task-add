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

const link = async(taskId: number, categoryId: number) => {
    return await request(`/task-category-relation?taskId=${taskId}&categoryId=${categoryId}`, {
        method: "POST",
    });
}

const unlink = async(taskId: number, categoryId: number) => {
    return await request(`/task-category-relation?taskId=${taskId}&categoryId=${categoryId}`, {
        method: "DELETE",
    });
}

export const category = {
    getAll,
    create,
    link,
    unlink,
};
