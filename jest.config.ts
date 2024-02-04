import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/server"],
    testPathIgnorePatterns: [
        "<rootDir>/server/api/v1/__tests__/user",
        "<rootDir>/server/api/v1/__tests__/task_status",
        "<rootDir>/server/api/v1/__tests__/task_category",
        "<rootDir>/server/api/v1/__tests__/base-tests.ts",
    ],
};

export default config;
