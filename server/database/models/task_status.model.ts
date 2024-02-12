import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Task from "./task.model";

@Table({
    timestamps: true,
    tableName: "task_status",
    modelName: "TaskStatus",
    createdAt: "create_date",
    updatedAt: "update_date",
    defaultScope: {
        attributes: { 
            exclude: ["id", "create_date", "update_date"]
        }
    },
    scopes: {
        active: {
            where: {
                name: "active",
            }
        }
    }
})
class TaskStatus extends Model {
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

    @HasMany(() => Task)
    tasks!: Task[];
}

export default TaskStatus;
