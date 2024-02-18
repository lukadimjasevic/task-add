import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./user.model";

@Table({
    timestamps: true,
    tableName: "user_otp",
    modelName: "UserOtp",
    createdAt: "create_date",
    updatedAt: "update_date",
})
class UserOtp extends Model {
    @Column({
        type: DataType.STRING(64),
        allowNull: false,
    })
    secret!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    authUrl!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}

export default UserOtp;
