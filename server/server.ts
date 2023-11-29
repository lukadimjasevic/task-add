import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import session from "express-session";
import db from "./database";
import { SequelizeSessionStore } from "./api/v1/helpers/session.helper";
import userRouter from "./api/v1/routes/user.route";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8080;

db.authenticate().then(() => {
    console.log("Database connection has been established successfully");

    app.use(express.json());

    app.use(session({
        cookie: { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 },
        secret: process.env.SESSION_SECRET!,
        store: new SequelizeSessionStore(),
        resave: false,
        saveUninitialized: false,
        name: "task_add_session_id",
    }));

    app.use("/api/v1/user", userRouter);

    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to Express & TypeScript Server");
    });
    
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });    
});
