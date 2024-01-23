import { ValidationChain } from "express-validator";
import { TaskRules } from "./task-rules";


export class TaskValidations extends TaskRules {
    constructor() {
        super();
    }

    /*-------------------------- Set Rules Methods ---------------------------*/

    /**
     * Method sets rules for a new task
     * @returns Returns a list of task rules of type ValidationChain
     */
    static setCreateTaskRules(): ValidationChain[] {
        return [
            this.ruleDeadlineDate(),
            this.ruleDescription(),
            this.ruleName(),
        ];
    }
}
