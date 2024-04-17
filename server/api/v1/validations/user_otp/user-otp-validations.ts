import { ValidationChain } from "express-validator";
import { UserOtpRules } from "./user-otp-rules";
import { UserRules } from "../user/user-rules";


export class UserOtpValidations extends UserOtpRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets enable verification rules
     * @returns Returns a list of enable verification rules of type ValidationChain
     */
    static setEnableVerificationRules(): ValidationChain[] {
        return [
            this.ruleToken(),
        ];
    }

    /**
     * Method sets verify verification rules
     * @returns Returns a list of verify verification rules of type ValidationChain
     */
    static setVerifyVerificationRules(): ValidationChain[] {
        return [
            this.ruleToken(),
            UserRules.ruleEmail(),
            UserRules.rulePassword(),
        ];
    }
}
