import { Router } from "express";
import validations from "../validations/user.validation";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import controllers from "../controllers/user.controller";

const router = Router();

router.post("/signup", validations.signupRules, validate, controllers.signupUser);
router.post("/signin", validations.signinRules, validate, controllers.signinUser);
router.post("/signout", isAuthenticated, controllers.signoutUser);
router.get("/", isAuthenticated, controllers.getUser);
router.put("/", controllers.updateUser);
router.delete("/", controllers.deleteUser);

export default router;
