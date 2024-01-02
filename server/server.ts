import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import Database from "./database";
import { SequelizeSessionStore } from "./api/v1/helpers/session.helper";
import userRouter from "./api/v1/routes/user.route";
import { errorHandler } from "./api/v1/middlewares/error.middleware";

dotenv.config();

class Server {
    app: Application = express();
    port: number | string;
    constructor(port: number | string) {
        this.port = port;
    }

    private _loadRoutes() {
        this.app.use("/api/v1/user", userRouter);
    }

    start() {
        this.app.use(express.json());
        this.app.use(session({
            cookie: { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 },
            secret: process.env.SESSION_SECRET!,
            store: new SequelizeSessionStore(),
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
const port = process.env.NODE_ENV === "test" ? 8081 : process.env.PORT || 8080;
const server = new Server(port);

if (process.env.NODE_ENV !== "test") {
    db.authenticate()
        .then(() => {
            console.log("Database connection has been established successfully");
            server.start();
        })
        .catch((error) => {
            console.log(error);
        });    
}

export {
    db,
    port,
    server,
};
