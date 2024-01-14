import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/server"],
    testPathIgnorePatterns: [
        "<rootDir>/server/__tests__/user",
        "<rootDir>/server/__tests__/app-test-base.ts",
        "<rootDir>/server/__tests__/interfaces",
    ],
};

export default config;
