"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("task", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            deadline_date: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.TEXT
            },
            name: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "user",
                    key: "id",
                },
                // onUpdate: "",
                // onDelete: ""
            },
            status_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "task_status",
                    key: "id",
                },
                // onUpdate: "",
                // onDelete: ""
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
        return await queryInterface.dropTable("task");
    }
};
