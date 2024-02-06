"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.bulkInsert("task_status", [
        {
            color: "green",
            name: "completed",
            create_date: new Date(),
            update_date: new Date(),
        },
        {
            color: "yellow",
            name: "active",
            create_date: new Date(),
            update_date: new Date(),
        },
        {
            color: "red",
            name: "cancelled",
            create_date: new Date(),
            update_date: new Date(),
        },
       ]);
    },

    async down (queryInterface, Sequelize) {
        return await queryInterface.bulkDelete("task_status", null, {});
    }
};
