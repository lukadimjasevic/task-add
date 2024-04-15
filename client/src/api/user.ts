import { request } from "./request";
import type { UserUpdatePasswordDTO } from "taskadd/user";
import type { Response } from "taskadd/response";

const get = async(): Promise<Response> => {
    return await request("/user", {
        method: "GET",
    });
}

const update = async(avatar: File | null, firstname: string, lastname: string): Promise<Response> => {
    const formData = new FormData();
    formData.append("avatar", avatar === null ? new File([], "") : avatar);
    formData.append("firstname", firstname === null ? "" : firstname);
    formData.append("lastname", lastname === null ? "" : lastname);

    return await request("/user", {
        headers: {},
        method: "PUT",
        body: formData,
    });
}

const updatePassword = async(dto: UserUpdatePasswordDTO): Promise<Response> => {
    return await request("/user/password", {
        method: "PUT",
        body: JSON.stringify(dto),
    });
}

const generateVerificationCode = async(): Promise<Response> => {
    return await request("/user/verify-generate", {
        method: "POST",
    });
}

const validateVerificationCode = async(code: string): Promise<Response> => {
    const data = { code };
    return await request("/user/verify-validate", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const user = {
    get,
    update,
    updatePassword,
    generateVerificationCode,
    validateVerificationCode,
};
