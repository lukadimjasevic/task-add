import { ValidationChain, body, param } from "express-validator";


export class TaskRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for deadline date field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleDeadlineDate(options={ optional: false }): ValidationChain {
        const rule = body("deadlineDate")
            .custom((value) => {
                return Date.parse(value);
            }).withMessage("Task deadline date must be a date")
            .custom((value) => {
                return Date.now() < new Date(value).getTime();
            }).withMessage("Task deadline date cannot be in the past").exists();

        if (!options.optional) {
            return rule.notEmpty().withMessage("Task deadline date is required");
        }
        return rule.optional();
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
    static ruleName(options={ optional: false }): ValidationChain {
        const rule = body("name")
            .isString().withMessage("Task name must be a string")
            .isLength({ min: 4, max: 64 }).withMessage("Task name must be between 4 and 64 characters");
        
        if (!options.optional) {
            return rule.notEmpty().withMessage("Task name is required");
        }
        return rule.optional();
    }

    /**
     * Rule method for status field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleStatus(): ValidationChain {
        return body("status")
            .isString().withMessage("Task status must be a string")
            .isLength({ min: 4, max: 64 }).withMessage("Task status must be between 4 and 64 characters")
            .optional();
    }

    /**
     * Rule method for id field inside param of request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleId(): ValidationChain {
        return param("taskId")
            .notEmpty().withMessage("Task id is required")
            .isNumeric().withMessage("Task id must be numeric");
    }
}
