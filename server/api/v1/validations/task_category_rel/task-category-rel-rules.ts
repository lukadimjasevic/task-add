import { ValidationChain, body, param, query } from "express-validator";


export class TaskCategoryRelationRules {
    constructor() {}

    /*----------------------------- Rule Methods -----------------------------*/
 
    /**
     * Rule method for taskId field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleTaskId(): ValidationChain {
        return query("taskId")
            .notEmpty().withMessage("Task ID is required")
            .isNumeric().withMessage("Task ID must be numeric");
    }

    /**
     * Rule method for categoryId field inside body request
     * @returns Returns an express-validator ValidationChain
     */
    static ruleCategoryId(): ValidationChain {
        return query("categoryId")
            .notEmpty().withMessage("Task category ID is required")
            .isNumeric().withMessage("Task category ID must be numeric");
    }
}
