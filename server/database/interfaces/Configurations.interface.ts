import { DatabaseConfig } from "./DatabaseConfig.interface";

export interface Configurations {
    development: DatabaseConfig;
    test: DatabaseConfig;
    production: DatabaseConfig;
}
