import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import Database from "./database";
import { SessionStoreSequelize } from "./api/v1/helpers/session";
import router from "./api/v1/routes/routes";
import { errorHandler } from "./api/v1/middlewares/error.middleware";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

export class Server {
    app: Application = express();
    port: number | string;
    constructor(port: number | string) {
        this.port = port;
    }

    private _loadRoutes() {
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use("/", router);
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
            cookie: {
                httpOnly: process.env.COOKIE_HTTP_ONLY! === "false" ? false : true,
                maxAge: parseInt(process.env.COOKIE_MAX_AGE!),
                sameSite: process.env.COOKIE_SAMESITE as boolean | "lax" | "none" | "strict" | undefined,
                secure: process.env.COOKIE_SECURE === "false" ? false : true,
            },
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
