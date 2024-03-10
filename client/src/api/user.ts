import { request } from "./request";

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

const generateVerificationCode = async() => {
    return await request("/user/verify-generate", {
        method: "POST",
    });
}

const validateVerificationCode = async(code: string) => {
    const data = { code };
    return await request("/user/verify-validate", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export const user = {
    get,
    update,
    generateVerificationCode,
    validateVerificationCode,
};
