import { request } from "./request";
import type { UserUpdatePasswordDTO, UserVerificationGenerateDTO, UserVerificationValidateDTO } from "taskadd/user";

const get = async() => {
    return await request("/user", {
        method: "GET",
    });
}

const update = async(avatar: File | null, firstname: string, lastname: string) => {
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

const updatePassword = async(dto: UserUpdatePasswordDTO) => {
    return await request("/user/password", {
        method: "PUT",
        body: JSON.stringify(dto),
    });
}

const remove = async() => {
    return await request("/user", {
        method: "DELETE",
    });
}

const generateVerificationCode = async(dto: UserVerificationGenerateDTO) => {
    return await request("/user/verify-generate", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

const validateVerificationCode = async(dto: UserVerificationValidateDTO) => {
    return await request("/user/verify-validate", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

export const user = {
    get,
    update,
    updatePassword,
    remove,
    generateVerificationCode,
    validateVerificationCode,
};
