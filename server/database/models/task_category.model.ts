import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";
import TaskTaskCategoryRel from "./task_task_category_rel.model";

@Table({
    timestamps: true,
    tableName: "task_category",
    modelName: "TaskCategory",
    createdAt: "create_date",
    updatedAt: "update_date",
})
class TaskCategory extends Model {
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    color!: string;

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

    @HasMany(() => TaskTaskCategoryRel)
    taskTaskCategoriesRel!: TaskTaskCategoryRel[];
}

export default TaskCategory;
