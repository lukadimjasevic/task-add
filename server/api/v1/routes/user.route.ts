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
    const controllerSignup = new UserControllerSignup(req, res, next);
    controllerSignup.signupUser();
});
router.post("/signin", validations.signinRules, validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerSignin = new UserControllerSignin(req, res, next);
    controllerSignin.signinUser();
});
router.post("/signout", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerSignout = new UserControllerSignout(req, res, next);
    controllerSignout.signoutUser();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerGet = new UserControllerGet(req, res, next);
    controllerGet.getUser();
});
router.put("/", (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new UserControllerUpdate(req, res, next);
    controllerUpdate.updateUser();
});
router.delete("/", (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserControllerDelete(req, res, next);
    controllerDelete.deleteUser();
});

export default router;
