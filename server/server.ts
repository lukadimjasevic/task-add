import express, { Request, Response, Application } from "express";
import db from "./database";

const app: Application = express();
const port = 8080;

db.sync({ alter: true }).then(() => {
    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to Express & TypeScript Server");
    });
    
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });    
});
