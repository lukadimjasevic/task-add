import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>"],
    testPathIgnorePatterns: [
        "<rootDir>/api/v1/__tests__/user",
        "<rootDir>/api/v1/__tests__/task_status",
        "<rootDir>/api/v1/__tests__/task_category",
        "<rootDir>/api/v1/__tests__/task",
        "<rootDir>/api/v1/__tests__/base-tests.ts",
    ],
};

export default config;
