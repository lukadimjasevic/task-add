import { ValidationChain, body, param } from "express-validator";


export class TaskRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for deadline date field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleDeadlineDate(): ValidationChain {
        return body("deadlineDate")
            .notEmpty().withMessage("Task deadline date is required")
            .custom((value) => {
                return Date.parse(value);
            }).withMessage("Task deadline date must be a date");
    }

    /**
     * Rule method for description field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleDescription(): ValidationChain {
        return body("description")
            .isString().withMessage("Task description must be a string")
            .optional({ nullable: true });
    }

    /**
     * Rule method for name field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleName(): ValidationChain {
        return body("name")
            .notEmpty().withMessage("Task name is required")
            .isString().withMessage("Task name must be a string")
            .isLength({ max: 64 }).withMessage("Task name must be a maximum of 64 characters");
    }

    /**
     * Rule method for task categories field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleCategoryIds(): ValidationChain {
        return body("categoryIds")
            .isArray().withMessage("Task categories must be an array")
            .optional({ nullable: true });
    }
}
