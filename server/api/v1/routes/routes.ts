import { Router } from "express";
import userRouter from "./user.route";
import taskStatusRouter from "./task_status.route";
import taskCategoryRouter from "./task_category.route";
import taskRouter from "./task.route";
import taskCategoryRelationRouter from "./task_category_rel.route";
import userOtp from "./user_otp.route";

const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/task-status", taskStatusRouter);
router.use("/api/v1/task-category", taskCategoryRouter);
router.use("/api/v1/task", taskRouter);
router.use("/api/v1/task-category-relation", taskCategoryRelationRouter);
router.use("/api/v1/2fa", userOtp);

export default router;
