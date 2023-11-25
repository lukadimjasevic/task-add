import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const configPath = path.resolve("server/database/config", "config.json");
const config = {
    development: {
        url: process.env.DEV_DB_URL, 
        migrationStorage: "sequelize",
        migrationStorageTableName: "sequelize_meta",
        seederStorage: "sequelize",
        seederStorageTableName: "sequelize_data"
    },
    test: {
        url: process.env.TEST_DB_URL,
        migrationStorage: "sequelize",
        migrationStorageTableName: "sequelize_meta",
        seederStorage: "sequelize",
        seederStorageTableName: "sequelize_data"
    },
    production: {
        url: process.env.PROD_DB_URL,
        migrationStorage: "sequelize",
        migrationStorageTableName: "sequelize_meta",
        seederStorage: "sequelize",
        seederStorageTableName: "sequelize_data"
    }
};

fs.writeFile(configPath, JSON.stringify(config), (error) => {
    if (error) {
        return console.log(error);
    }
    console.log(`The config file was saved at ${configPath}`);
});
