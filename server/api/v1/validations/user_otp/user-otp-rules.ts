import { ValidationChain, body } from "express-validator";


export class UserOtpRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for token field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleToken(): ValidationChain {
        return body("token")
            .notEmpty().withMessage("Token is required")
            .isString().withMessage("Token must be a string")
            .custom((value) => value.length === 6).withMessage("Token is a 6-digit code");
    }
}
