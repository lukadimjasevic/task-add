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
            this.rulePassword({ optional: true }),
        ];
    }
}
