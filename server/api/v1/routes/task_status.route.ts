import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { TaskStatusControllerRead } from "../controllers/task_status";

const router = Router();

router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new TaskStatusControllerRead(req, res, next);
    controllerRead.getTaskStatuses();
});

export default router;
