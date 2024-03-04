"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable("user_otp", {
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

        await queryInterface.sequelize.query(`
            CREATE OR REPLACE FUNCTION prevent_delete_if_otp_enabled()
            RETURNS TRIGGER AS $$
            BEGIN
            IF (SELECT otp_enabled FROM "user" WHERE id = OLD.user_id) THEN
                RAISE EXCEPTION 'Cannot delete record because otp_enabled is true in table "user".';
            END IF;
            RETURN OLD;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryInterface.sequelize.query(`
            CREATE TRIGGER prevent_delete_trigger
            BEFORE DELETE ON user_otp
            FOR EACH ROW
            EXECUTE FUNCTION prevent_delete_if_otp_enabled();
        `);

        return;
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS prevent_delete_trigger ON user_otp;');
        await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS prevent_delete_if_otp_enabled();');
        await queryInterface.dropTable("user_otp");
        return;
    }
};
