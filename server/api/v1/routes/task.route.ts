import { Router, Request, Response, NextFunction } from "express";
import { TaskValidations } from "../validations/task";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
    TaskControllerCreate,
} from "../controllers/task";

const router = Router();

router.post("/", TaskValidations.setCreateTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskControllerCreate(req, res, next);
    controllerCreate.create();
});

export default router;
