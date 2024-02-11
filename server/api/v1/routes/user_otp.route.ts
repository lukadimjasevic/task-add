import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { isAvailable2FA, isEnabled2FA } from "../middlewares/2fa.middleware";
import {
    UserOtpControllerCreate,
    UserOtpControllerRead,
} from "../controllers/user_otp";

const router = Router();

router.post("/enable", isAuthenticated, isAvailable2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerCreate = new UserOtpControllerCreate(req, res, next);
    controllerCreate.enable2FA();
});
router.get("/", isAuthenticated, isEnabled2FA, (req: Request, res: Response, next: NextFunction) => {
    const controllerRead = new UserOtpControllerRead(req, res, next);
    controllerRead.getQRCode();
});

export default router;
