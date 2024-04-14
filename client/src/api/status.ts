import { request } from "./request";
import type { Response } from "taskadd/response";

const getAll = async(): Promise<Response> => {
    return await request("/task-status", {
        method: "GET",
    });
};

export const status = {
    getAll,
};
