import { Router, Request, Response, NextFunction } from "express";
import { UserValidations } from "../validations/user";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { 
    UserControllerCreate,
    UserControllerRead,
    UserControllerUpdate,
    UserControllerDelete
} from "../controllers/user";

const router = Router();

router.post("/signup", UserValidations.setSignupRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signupUser();
});
router.post("/signin", UserValidations.setSigninRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signinUser();
});
router.post("/signout", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signoutUser();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new UserControllerRead(req, res, next);
    controllerRead.getUser();
});
router.put("/", UserValidations.setUpdateRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new UserControllerUpdate(req, res, next);
    controllerUpdate.updateUser();
});
router.delete("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserControllerDelete(req, res, next);
    controllerDelete.deleteUser();
});

export default router;
