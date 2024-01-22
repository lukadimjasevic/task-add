import { ValidationChain, body, param } from "express-validator";


export class TaskCategoryRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for color field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleColor(): ValidationChain {
        return body("color")
            .notEmpty().withMessage("Task category color is required")
            .isHexColor().withMessage("Task category color must be a hex")
            .isLength({ max: 64 }).withMessage("Task category color must be a maximum of 64 characters");
    }

    /**
     * Rule method for name field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleName(): ValidationChain {
        return body("name")
            .notEmpty().withMessage("Task category name is required")
            .isString().withMessage("Task category name must be a string")
            .isLength({ max: 64 }).withMessage("Task category name must be a maximum of 64 characters");
    }

    /**
     * Rule method for id field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleId(): ValidationChain {
        return param("categoryId")
            .notEmpty().withMessage("Task category id is required")
            .isNumeric().withMessage("Task category id must be numeric");
    }
}
