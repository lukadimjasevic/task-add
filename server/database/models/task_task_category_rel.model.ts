import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Task from "./task.model";
import TaskCategory from "./task_category.model";

@Table({
    timestamps: true,
    tableName: "task_task_category_rel",
    modelName: "TaskTaskCategoryRel",
    createdAt: "createDate",
    updatedAt: "updateDate",
})
class TaskTaskCategoryRel extends Model {
    @ForeignKey(() => Task)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    taskId!: number;

    @BelongsTo(() => Task)
    task!: Task;

    @ForeignKey(() => TaskCategory)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    taskCategoryId!: number;

    @BelongsTo(() => TaskCategory)
    categories!: TaskCategory;
}

export default TaskTaskCategoryRel;
