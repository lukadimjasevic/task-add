import { request } from "./request";

const getAll = async() => {
    return await request("/task", {
        method: "GET",
    });
};

const getOne = async(id: number) => {
    return await request(`/task/${id}`, {
        method: "GET",
    });
}

const create = async(name: string, description: string, deadlineDate: Date) => {
    const data = { name, description, deadlineDate };
    return await request("/task", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

const update = async(id: number, name: string, description: string, deadlineDate: Date) => {
    let data;
    if (deadlineDate.getTime() < Date.now()) {
        data = { name, description };
    } else {
        data = { name, description, deadlineDate };
    }
    return await request(`/task/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

const remove = async(id: number) => {
    return await request(`/task/${id}`, {
        method: "DELETE",
    });
}

export const task = {
    getAll,
    getOne,
    create,
    update,
    remove,
};
