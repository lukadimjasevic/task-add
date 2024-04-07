import { request } from "./request";
import type { Task } from "taskadd/task";
import type { TaskCategory } from "taskadd/task-category";

const getAll = async() => {
    return await request("/task-category", {
        method: "GET",
    });
};

const create = async(name: TaskCategory["name"], color: TaskCategory["color"]) => {
    const data = { name, color };
    return await request("/task-category", {
        method: "POST",
        body: JSON.stringify(data),
    });
};

const update = async(id: TaskCategory["id"], name: TaskCategory["name"], color: TaskCategory["color"]) => {
    const data = { name, color };
    return await request(`/task-category/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

const remove = async(id: TaskCategory["id"]) => {
    return await request(`/task-category/${id}`, {
        method: "DELETE",
    });
};

const link = async(taskId: Task["id"], categoryId: TaskCategory["id"]) => {
    return await request(`/task-category-relation?taskId=${taskId}&categoryId=${categoryId}`, {
        method: "POST",
    });
};

const unlink = async(taskId: Task["id"], categoryId: TaskCategory["id"]) => {
    return await request(`/task-category-relation?taskId=${taskId}&categoryId=${categoryId}`, {
        method: "DELETE",
    });
};

export const category = {
    getAll,
    create,
    update,
    remove,
    link,
    unlink,
};
