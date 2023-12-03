"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("task_status", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            color: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
            },
            name: {
                type: Sequelize.DataTypes.STRING(64),
                allowNull: false,
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
        return await queryInterface.dropTable("task_status");
    }
};
