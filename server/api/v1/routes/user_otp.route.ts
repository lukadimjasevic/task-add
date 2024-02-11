import { Router, Request, Response, NextFunction } from "express";
import { UserOtpValidations } from "../validations/user_otp";
import { validate } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAvailable2FA, isEnabled2FA } from "../middlewares/2fa.middleware";
import {
    UserOtpControllerCreate,
    UserOtpControllerDelete,
    UserOtpControllerRead,
} from "../controllers/user_otp";

const router = Router();

router.post("/enable", isAuthenticated, isAvailable2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.enable2FA();
});
router.post("/verify", UserOtpValidations.setValidateVerificationRules(), validate, isAuthenticated, isEnabled2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.verify2FA();
});
router.get("/", isAuthenticated, isEnabled2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new UserOtpControllerRead(req, res, next);
    controllerRead.getQRCode();
});
router.delete("/", isAuthenticated, isEnabled2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserOtpControllerDelete(req, res, next);
    controllerDelete.delete2FA();
});

export default router;
