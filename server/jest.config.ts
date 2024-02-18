import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["./"],
    testPathIgnorePatterns: [
        "./api/v1/__tests__/user",
        "./api/v1/__tests__/task_status",
        "./api/v1/__tests__/task_category",
        "./api/v1/__tests__/task",
        "./api/v1/__tests__/base-tests.ts",
    ],
};

export default config;
