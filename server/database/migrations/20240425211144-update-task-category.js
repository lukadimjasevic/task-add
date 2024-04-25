'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task_category DROP CONSTRAINT IF EXISTS task_category_user_id_fkey;
            ALTER TABLE IF EXISTS public.task_category
                ADD CONSTRAINT task_category_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE;
            `
        );
    },

    async down (queryInterface, Sequelize) {
        return await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task_category DROP CONSTRAINT IF EXISTS task_category_user_id_fkey;
            ALTER TABLE IF EXISTS public.task_category
                ADD CONSTRAINT task_category_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;
            `
        );
    }
};
