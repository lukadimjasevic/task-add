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

export const user = {
    get,
    update,
};
