import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
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
    otpAscii!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    otpAuthUrl!: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    otpEnabled!: boolean;

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
