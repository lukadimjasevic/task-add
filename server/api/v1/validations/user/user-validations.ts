import { ValidationChain } from "express-validator";
import { UserRules } from "./user-rules";


export class UserValidations extends UserRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets signup rules
     * @returns Returns a list of signup rules of type ValidationChain
     */
    static setSignupRules(): ValidationChain[] {
        return [
            this.ruleEmail(),
            this.ruleUsername(),
            this.rulePassword(),
            this.rulePasswordRetype(),
        ];
    }

    /**
     * Method sets signin rules
     * @returns Returns a list of signin rules of type ValidationChain
     */
    static setSigninRules(): ValidationChain[] {
        return [
            this.ruleEmail(),
            this.rulePassword(),
        ];
    }

    /**
     * Method sets update rules
     * @returns Returns a list of update rules of type ValidationChain
     */
    static setUpdateRules(): ValidationChain[] {
        return [
            this.ruleAvatar(),
            this.ruleFirstname(),
            this.ruleLastname(),
        ];
    }

    /**
     * Method sets update password rules
     * @returns Returns a list of update password rules of type ValidationChain
     */
    static setUpdatePasswordRules(): ValidationChain[] {
        return [
            this.rulePasswordOld(),
            this.rulePassword(),
            this.rulePasswordRetype(),
        ];
    }

    /**
     * Method sets verification generate rules
     * @returns Returns a list of verification generate rules of type ValidationChain
     */
    static setGenerateVerificationRules(): ValidationChain[] {
        return [
            this.ruleEmail(),
            this.rulePassword(),
        ];
    }

    /**
     * Method sets verification validation rules
     * @returns Returns a list of verification validation rules of type ValidationChain
     */
    static setValidateVerificationRules(): ValidationChain[] {
        return [
            this.ruleEmail(),
            this.rulePassword(),
            this.ruleVerificationCode(),
        ];
    }
}
