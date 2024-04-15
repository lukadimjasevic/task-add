import type { Response } from "taskadd/response";

export const request = async(url: string, options: RequestInit): Promise<Response> => {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...options
    });
    return await response.json();
};
