'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task DROP CONSTRAINT IF EXISTS task_user_id_fkey;
            ALTER TABLE IF EXISTS public.task
                ADD CONSTRAINT task_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE;
            `
        );

        await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task DROP CONSTRAINT IF EXISTS task_status_id_fkey;
            ALTER TABLE IF EXISTS public.task
                ADD CONSTRAINT task_status_id_fkey FOREIGN KEY (status_id)
                REFERENCES public.task_status (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE;
            `
        );

        return;
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task DROP CONSTRAINT IF EXISTS task_user_id_fkey;
            ALTER TABLE IF EXISTS public.task
                ADD CONSTRAINT task_user_id_fkey FOREIGN KEY (user_id)
                REFERENCES public."user" (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;
            `
        );

        await queryInterface.sequelize.query(
            `
            ALTER TABLE IF EXISTS public.task DROP CONSTRAINT IF EXISTS task_status_id_fkey;
            ALTER TABLE IF EXISTS public.task
                ADD CONSTRAINT task_status_id_fkey FOREIGN KEY (status_id)
                REFERENCES public.task_status (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION;
            `
        );

        return;
    }
};
