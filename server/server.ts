import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import Database from "./database";
import { SessionStoreSequelize } from "./api/v1/helpers/session";
import userRouter from "./api/v1/routes/user.route";
import taskStatusRouter from "./api/v1/routes/task_status.route";
import taskCategoryRouter from "./api/v1/routes/task_category.route";
import taskRouter from "./api/v1/routes/task.route";
import taskCategoryRelationRouter from "./api/v1/routes/task_category_rel.route";
import userOtp from "./api/v1/routes/user_otp.route";
import { errorHandler } from "./api/v1/middlewares/error.middleware";
import cors from "cors";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

export class Server {
    app: Application = express();
    port: number | string;
    constructor(port: number | string) {
        this.port = port;
    }

    private _loadRoutes() {
        this.app.use("/api/v1/user", userRouter);
        this.app.use("/api/v1/task-status", taskStatusRouter);
        this.app.use("/api/v1/task-category", taskCategoryRouter);
        this.app.use("/api/v1/task", taskRouter);
        this.app.use("/api/v1/task-category-relation", taskCategoryRelationRouter);
        this.app.use("/api/v1/2fa", userOtp);
    }

    start() {
        this.app.use(cors({
            origin: NODE_ENV == "dev" 
                ? process.env.DEV_CLIENT_URL 
                : NODE_ENV == "test" 
                    ? process.env.TEST_CLIENT_URL 
                    : process.env.PROD_CLIENT_URL,
            credentials: true,
        }));
        this.app.use(express.json());
        this.app.use(session({
            cookie: { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 },
            secret: process.env.SESSION_SECRET!,
            store: new SessionStoreSequelize(),
            resave: false,
            saveUninitialized: false,
            name: "task_add_session_id",
        }));
        this._loadRoutes();
        this.app.use(errorHandler);
        
        this.app.listen(this.port, () => {
            console.log(`Server started at http://localhost:${this.port}`);
        });
    }
}

const db = new Database();
const port = NODE_ENV === "test" ? 8081 : process.env.PORT || 8080;
const server = new Server(port);

if (NODE_ENV !== "test") {
    db.authenticate()
        .then(() => {
            console.log("Database connection has been established successfully");
            server.start();
        })
        .catch((error: any) => {
            console.log(error);
        });    
}

export {
    db,
    port,
    server,
};
