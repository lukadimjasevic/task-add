import "express-session";

export interface SessionUserData {
    id: number,
    email: string;
    username: string;
}

declare module "express-session" {
    interface SessionData {
        user: SessionUserData;
    }
}
