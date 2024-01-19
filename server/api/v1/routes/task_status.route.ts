import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { TaskStatusControllerGet } from "../controllers/task_status";

const router = Router();

router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerGet = new TaskStatusControllerGet(req, res, next);
    controllerGet.getTaskStatuses();
});

export default router;
