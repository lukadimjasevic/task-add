import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";
import db from "./database";
import userRouter from "./api/v1/routes/user.route";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8080;

db.authenticate().then(() => {
    console.log("Database connection has been established successfully");

    app.use(express.json());
    app.use("/api/v1/user", userRouter);

    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to Express & TypeScript Server");
    });
    
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });    
});
