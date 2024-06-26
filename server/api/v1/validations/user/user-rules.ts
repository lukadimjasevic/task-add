import { ValidationChain, body } from "express-validator";


export class UserRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for email field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleEmail(): ValidationChain {
        return body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is not valid");
    }

    /**
     * Rule method for username field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleUsername(): ValidationChain {
        return body("username")
            .notEmpty().withMessage("Username is required")
            .isString().withMessage("Username must be a string")
            .isLength({ min: 4, max: 16 }).withMessage("Username must be between 4 and 16 characters");
    }

    /**
     * Rule method for password field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static rulePassword(): ValidationChain {
        return body("password")
            .isString().withMessage("Password must be a string")
            .isLength({ min: 8 }).withMessage("Password must be minimum of 8 characters")
            .notEmpty().withMessage("Password is required");
    }

    /**
     * Rule method for password retype field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static rulePasswordRetype(): ValidationChain {
        return body("passwordRetype")
            .notEmpty().withMessage("Retype password is required")
            .custom((value, { req }) => value === req.body.password).withMessage("The passwords do not match");
    }

    /**
     * Rule method for old password field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static rulePasswordOld(): ValidationChain {
        return body("passwordOld")
            .isString().withMessage("Old password must be a string")
            .isLength({ min: 8 }).withMessage("Old password must be minimum of 8 characters")
            .notEmpty().withMessage("Old password is required");
    }

    /**
     * Rule method for avatar field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleAvatar(): ValidationChain {
        return body("avatar");
    }

    /**
     * Rule method for firstname field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleFirstname(): ValidationChain {
        return body("firstname")
            .isString().withMessage("Firstname must be a string")
            .isLength({ max: 32 }).withMessage("Firstname must be a maximum of 32 characters")
            .optional({ nullable: true });
    }

    /**
     * Rule method for lastname field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleLastname(): ValidationChain {
        return body("lastname")
            .isString().withMessage("Lastname must be a string")
            .isLength({ max: 32 }).withMessage("Lastname must be a maximum of 32 characters")
            .optional({ nullable: true });
    }

    /**
     * Rule method for code field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleVerificationCode(): ValidationChain {
        return body("code")
            .isString().withMessage("Verification code must be a string")
            .custom((value) => value.length === 6).withMessage("Verification code a is 6-digit code");
    }
}
