import { request } from "./request";
import { status } from "./status";
import type { TaskGetDTO, TaskCreateDTO, TaskUpdateDTO, TaskDeleteDTO } from "taskadd/task";
import type { Response } from "taskadd/response";

const getAll = async(): Promise<Response> => {
    return await request("/task", {
        method: "GET",
    });
};

const getOne = async(dto: TaskGetDTO): Promise<Response> => {
    return await request(`/task/${dto.id}`, {
        method: "GET",
    });
}

const create = async(dto: TaskCreateDTO): Promise<Response> => {
    return await request("/task", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

const update = async(dto: TaskUpdateDTO): Promise<Response> => {
    return await request(`/task/${dto.id}`, {
        method: "PUT",
        body: JSON.stringify(dto),
    });
}

const remove = async(dto: TaskDeleteDTO): Promise<Response> => {
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
