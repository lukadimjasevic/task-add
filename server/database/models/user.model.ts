import { Table, Column, Model, DataType, Default, HasOne, HasMany } from "sequelize-typescript";
import UserOtp from "./user_otp.model";
import Task from "./task.model";
import TaskCategory from "./task_category.model";

@Table({
    timestamps: true,
    tableName: "user",
    modelName: "User",
    createdAt: "create_date",
    updatedAt: "update_date",
    defaultScope: {
        attributes: {
            exclude: ["id", "password", "verificationCode", "verificationCodeLastDate"]
        }
    }
})
class User extends Model {
    @Column({
        type: DataType.BLOB,
    })
    avatar!: Blob;

    @Column({
        type: DataType.STRING(320),
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING(32),
    })
    firstname!: string;

    @Column({
        type: DataType.STRING(32),
    })
    lastname!: string;

    @Column({
        type: DataType.STRING(72),
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING(16),
        allowNull: false,
        unique: true,
    })
    username!: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    verified!: boolean;

    @Column({
        type: DataType.STRING(6),
    })
    verificationCode!: string | null;

    @Column({
        type: DataType.DATE,
    })
    verificationCodeLastDate!: Date | null;

    @HasOne(() => UserOtp)
    userOtp!: UserOtp;

    @HasMany(() => Task)
    tasks!: Task[];

    @HasMany(() => TaskCategory)
    taskCategories!: TaskCategory[];
}

export default User;
