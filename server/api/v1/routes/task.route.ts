import { Router, Request, Response, NextFunction } from "express";
import { TaskValidations } from "../validations/task";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
    TaskControllerCreate,
    TaskControllerRead,
} from "../controllers/task";

const router = Router();

router.post("/", TaskValidations.setCreateTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskControllerCreate(req, res, next);
    controllerCreate.create();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new TaskControllerRead(req, res, next);
    controllerRead.getAll();
});

export default router;
