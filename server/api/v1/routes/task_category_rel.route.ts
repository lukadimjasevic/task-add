import { Router, Request, Response, NextFunction } from "express";
import { TaskCategoryRelationValidations } from "../validations/task_category_rel";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
    TaskCategoryRelationControllerCreate,
    TaskCategoryRelationControllerDelete,
} from "../controllers/task_category_rel";

const router = Router();

router.post("/", TaskCategoryRelationValidations.setCreateRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskCategoryRelationControllerCreate(req, res, next);
    controllerCreate.createRelation();
});
router.delete("/", TaskCategoryRelationValidations.setDeleteRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new TaskCategoryRelationControllerDelete(req, res, next);
    controllerDelete.deleteRelation();
});

export default router;
