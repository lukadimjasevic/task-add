import { ValidationChain } from "express-validator";
import { UserOtpRules } from "./user-otp-rules";


export class UserOtpValidations extends UserOtpRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets verification validation rules
     * @returns Returns a list of verification validation rules of type ValidationChain
     */
    static setValidateVerificationRules(): ValidationChain[] {
        return [
            this.ruleToken(),
        ];
    }
}
