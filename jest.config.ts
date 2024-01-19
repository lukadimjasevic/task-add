import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/server"],
    testPathIgnorePatterns: [
        "<rootDir>/server/__tests__/user",
        "<rootDir>/server/__tests__/task_status",
        "<rootDir>/server/__tests__/app-test-base.ts",
        "<rootDir>/server/__tests__/base-tests.ts",
        "<rootDir>/server/__tests__/interfaces",
    ],
};

export default config;
