import { Router, Request, Response, NextFunction } from "express";
import { TaskCategoryValidations } from "../validations/task_category";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
    TaskCategoryControllerCreate,
    TaskCategoryControllerDelete,
    TaskCategoryControllerRead,
    TaskCategoryControllerUpdate,
} from "../controllers/task_category";

const router = Router();

router.post("/", TaskCategoryValidations.setCreateCategoryRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskCategoryControllerCreate(req, res, next);
    controllerCreate.createCategory();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new TaskCategoryControllerRead(req, res, next);
    controllerRead.getCategories();
});
router.put("/:categoryId", TaskCategoryValidations.setUpdateCategoryRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new TaskCategoryControllerUpdate(req, res, next);
    controllerUpdate.updateCategory();
});
router.delete("/:categoryId", TaskCategoryValidations.setDeleteCategoryRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new TaskCategoryControllerDelete(req, res, next);
    controllerDelete.deleteCategory();
});

export default router;
