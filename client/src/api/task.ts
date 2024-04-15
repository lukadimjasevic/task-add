import { request } from "./request";
import { status } from "./status";
import type { TaskGetDTO, TaskCreateDTO, TaskUpdateDTO, TaskDeleteDTO } from "taskadd/task";

const getAll = async() => {
    return await request("/task", {
        method: "GET",
    });
};

const getOne = async(dto: TaskGetDTO) => {
    return await request(`/task/${dto.id}`, {
        method: "GET",
    });
}

const create = async(dto: TaskCreateDTO) => {
    return await request("/task", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

const update = async(dto: TaskUpdateDTO) => {
    return await request(`/task/${dto.id}`, {
        method: "PUT",
        body: JSON.stringify(dto),
    });
}

const remove = async(dto: TaskDeleteDTO) => {
    return await request(`/task/${dto.id}`, {
        method: "DELETE",
    });
}

export const task = {
    getAll,
    getOne,
    create,
    update,
    remove,
    status,
};
