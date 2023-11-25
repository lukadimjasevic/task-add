export interface DatabaseConfig {
    url: string;
    migrationStorage: string;
    migrationStorageTableName: string;
    seederStorage: string;
    seederStorageTableName: string;
}
