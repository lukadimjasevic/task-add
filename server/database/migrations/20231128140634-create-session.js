"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("session", {
            id: {
                type: Sequelize.DataTypes.STRING(36),
                primaryKey: true,
            },
            data: {
                type: Sequelize.DataTypes.JSON,
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
        return await queryInterface.dropTable("session");
    }
};
