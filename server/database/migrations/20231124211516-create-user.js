"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("user", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            avatar: {
                type: Sequelize.DataTypes.BLOB
            },
            email: {
                type: Sequelize.DataTypes.STRING(320),
                allowNull: false,
                unique: true,
            },
            firstname: {
                type: Sequelize.DataTypes.STRING(32),
            },
            lastname: {
                type: Sequelize.DataTypes.STRING(32),
            },
            password: {
                type: Sequelize.DataTypes.STRING(72),
                allowNull: false,
            },
            username: {
                type: Sequelize.DataTypes.STRING(16),
                allowNull: false,
                unique: true,
            },
            verification_code: {
                type: Sequelize.DataTypes.STRING(6),
            },
            verified: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
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
        return await queryInterface.dropTable("user");
    }
};
