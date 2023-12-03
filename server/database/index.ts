import dotenv from "dotenv";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import configurations from "./config/config.json";
import { Configurations } from "./interfaces/Configurations.interface";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configurations[env as keyof Configurations];

const defaultSequelizeOptions: SequelizeOptions = {
    storage: ":memory:",
    models: [__dirname + "/models"],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf(".model")).replace("_", "") === member.toLowerCase();
    },
    define: {
        "underscored": true,
    },
    logging: false,
}

class Database extends Sequelize {
    constructor(uri: string=config.url, options: SequelizeOptions=defaultSequelizeOptions) {
        super(uri, options);
    }
}

export default Database;
