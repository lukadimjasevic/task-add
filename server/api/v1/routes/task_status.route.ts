import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { TaskStatusControllerRead } from "../controllers/task_status";

const router = Router();

router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerGet = new TaskStatusControllerRead(req, res, next);
    controllerGet.getTaskStatuses();
});

export default router;
