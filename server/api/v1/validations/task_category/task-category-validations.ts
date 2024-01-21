import { ValidationChain } from "express-validator";
import { TaskCategoryRules } from "./task-category-rules";


export class TaskCategoryValidations extends TaskCategoryRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets rules for a new task category
     * @returns Returns a list of task category rules of type ValidationChain
     */
    static setCreateCategoryRules(): ValidationChain[] {
        return [
            this.ruleColor(),
            this.ruleName(),
        ];
    }
}
