import { ValidationChain } from "express-validator";
import { TaskCategoryRelationRules } from "./task-category-rel-rules";


export class TaskCategoryRelationValidations extends TaskCategoryRelationRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets rules for a new task category relation
     * @returns Returns a list of task category rules of type ValidationChain
     */
    static setCreateRules(): ValidationChain[] {
        return [
            this.ruleTaskId(),
            this.ruleCategoryId(),
        ];
    }

    /**
     * Method sets rules for a new task category relation
     * @returns Returns a list of task category rules of type ValidationChain
     */
    static setDeleteRules(): ValidationChain[] {
        return [
            this.ruleId(),
        ];
    }
}
