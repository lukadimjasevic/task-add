const server = "http://localhost:8080/api/v1";

export const request = async(url: string, options: RequestInit) => {
    const response = await fetch(server + url, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        ...options
    });
    return await response.json();
};
