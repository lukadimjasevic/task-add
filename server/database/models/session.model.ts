import { SessionData } from "express-session";
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "session",
    modelName: "Session",
    createdAt: "create_date",
    updatedAt: "update_date",
})
class Session extends Model {
    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    data!: SessionData;
}

export default Session;
