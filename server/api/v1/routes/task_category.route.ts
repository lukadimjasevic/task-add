import { Router, Request, Response, NextFunction } from "express";
import { TaskCategoryValidations } from "../validations/task_category";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { TaskCategoryControllerCreate } from "../controllers/task_category";

const router = Router();

router.post("/", TaskCategoryValidations.setCreateCategoryRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskCategoryControllerCreate(req, res, next);
    controllerCreate.createCategory();
});

export default router;
