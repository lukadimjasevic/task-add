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
import multer from "multer";

const router = Router();
const upload = multer({
    limits: {
        fieldSize: 10 * 1024 * 1024,
    }
});

router.post("/signup", UserValidations.setSignupRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signup();
});
router.post("/signin", UserValidations.setSigninRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signin();
});
router.post("/signout", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.signout();
});
router.post("/verify-generate", UserValidations.setGenerateVerificationRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.verifyGenerate();
});
router.post("/verify-validate", UserValidations.setValidateVerificationRules(), validate, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserControllerCreate(req, res, next);
    controllerCreate.verifyValidate();
});
router.get("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new UserControllerRead(req, res, next);
    controllerRead.get();
});
router.put("/", upload.single("avatar"), UserValidations.setUpdateRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new UserControllerUpdate(req, res, next);
    controllerUpdate.update();
});
router.put("/password", UserValidations.setUpdatePasswordRules(), validate, isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerUpdate = new UserControllerUpdate(req, res, next);
    controllerUpdate.updatePassword();
});
router.delete("/", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserControllerDelete(req, res, next);
    controllerDelete.delete();
});

export default router;
