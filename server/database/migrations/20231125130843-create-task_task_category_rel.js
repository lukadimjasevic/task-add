"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable("task_task_category_rel", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            task_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "task",
                    key: "id",
                },
                // onUpdate: "",
                onDelete: "CASCADE",
            },
            task_category_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "task_category",
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
        return await queryInterface.dropTable("task_task_category_rel");
    }
};
