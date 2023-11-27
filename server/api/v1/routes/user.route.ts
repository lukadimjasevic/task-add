import { Router } from "express";
import validations from "../validations/user.validation";
import middlewares from "../middlewares/user.middleware";
import controllers from "../controllers/user.controller";

const router = Router();

router.post("/signup", validations.signupRules, middlewares.validateSignup, controllers.signupUser);
router.post("/signin", controllers.signinUser);
router.post("/signout", controllers.signoutUser);
router.get("/", controllers.getUser);
router.put("/", controllers.updateUser);
router.delete("/", controllers.deleteUser);

export default router;
