import { Router, Request, Response, NextFunction } from "express";
import { TaskValidations } from "../validations/task";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
    TaskControllerCreate,
    TaskControllerDelete,
    TaskControllerRead,
    TaskControllerUpdate,
} from "../controllers/task";

const router = Router();

router.post("/", TaskValidations.setCreateTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new TaskControllerCreate(req, res, next);
    controllerCreate.createTask();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new TaskControllerRead(req, res, next);
    controllerRead.getAll();
});
router.get("/:taskId", TaskValidations.setGetOneTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new TaskControllerRead(req, res, next);
    controllerRead.getOne();
});
router.put("/:taskId", TaskValidations.setUpdateTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new TaskControllerUpdate(req, res, next);
    controllerUpdate.updateTask();
});
router.delete("/:taskId", TaskValidations.setDeleteTaskRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new TaskControllerDelete(req, res, next);
    controllerDelete.deleteTask();
});

export default router;
