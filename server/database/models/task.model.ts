import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import User from "./user.model";
import TaskStatus from "./task_status.model";
import TaskTaskCategoryRel from "./task_task_category_rel.model";

@Table({
    timestamps: true,
    tableName: "task",
    modelName: "Task",
    createdAt: "create_date",
    updatedAt: "update_date",
})
class Task extends Model {
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    deadlineDate!: Date;

    @Column({
        type: DataType.TEXT,
    })
    description!: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    name!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: User;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => TaskStatus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    statusId!: TaskStatus;

    @BelongsTo(() => TaskStatus)
    status!: TaskStatus;

    @HasMany(() => TaskTaskCategoryRel)
    taskTaskCategoriesRel!: TaskTaskCategoryRel[];
}

export default Task;
