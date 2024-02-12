"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("user_otp", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            secret: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            auth_url: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id",
                },
                // onUpdate: "",
                onDelete: "CASCADE",
            },
            create_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            update_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
        });
    },

    async down (queryInterface, Sequelize) {
        return await queryInterface.dropTable("user_otp");
    }
};
