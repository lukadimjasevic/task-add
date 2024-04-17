import { Router, Request, Response, NextFunction } from "express";
import { UserOtpValidations } from "../validations/user_otp";
import { validate, validateUserSignin } from "../middlewares/validate.middleware";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { checkOTPNotGenerated, checkOTPGenerated, checkOTPNotEnabled, checkOTPEnabled } from "../middlewares/otp.middleware";
import {
    UserOtpControllerCreate,
    UserOtpControllerDelete,
    UserOtpControllerRead,
} from "../controllers/user_otp";

const router = Router();

router.post("/generate", isAuthenticated, checkOTPNotGenerated, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.generateOTP();
});
router.post("/enable", UserOtpValidations.setEnableVerificationRules(), validate, isAuthenticated, checkOTPNotEnabled, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.enable2FA();
});
router.post("/verify", UserOtpValidations.setVerifyVerificationRules(), validate, validateUserSignin, checkOTPEnabled, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.verify2FA();
});
router.get("/", isAuthenticated, checkOTPGenerated, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new UserOtpControllerRead(req, res, next);
    controllerRead.getQRCode();
});
router.delete("/", isAuthenticated, checkOTPEnabled, (req: Request, res: Response, next: NextFunction) => {
    const controllerDelete = new UserOtpControllerDelete(req, res, next);
    controllerDelete.delete2FA();
});

export default router;
