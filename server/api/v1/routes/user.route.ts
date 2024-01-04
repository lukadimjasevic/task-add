import { Router, Request, Response, NextFunction } from "express";
import validations from "../validations/user.validation";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { 
    UserControllerSignup,
    UserControllerSignin,
    UserControllerSignout,
    UserControllerGet,
    UserControllerUpdate,
    UserControllerDelete
} from "../controllers/user";

const router = Router();

router.post("/signup", validations.signupRules, validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerSignup = new UserControllerSignup();
    controllerSignup.signupUser(req, res, next);
});
router.post("/signin", validations.signinRules, validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerSignin = new UserControllerSignin();
    controllerSignin.signinUser(req, res, next);
});
router.post("/signout", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerSignout = new UserControllerSignout();
    controllerSignout.signoutUser(req, res, next);
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerGet = new UserControllerGet();
    controllerGet.getUser(req, res, next);
});
router.put("/", (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new UserControllerUpdate();
    controllerUpdate.updateUser(req, res, next);
});
router.delete("/", (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserControllerDelete();
    controllerDelete.deleteUser(req, res, next);
});

export default router;
