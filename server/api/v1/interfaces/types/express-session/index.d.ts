import "express-session";

export interface SessionUserData {
    email: string;
    username: string;
}

declare module "express-session" {
    interface SessionData {
        user: SessionUserData | null;
    }
}
