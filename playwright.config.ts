import { defineConfig } from "@playwright/test";
import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.ENV || 'dev';

dotenv.config({ path: path.resolve(__dirname, `configs/.env.${ENV}`)});
const baseURL = process.env.BASE_URL || 'http://localhost:3000';
console.log(`ENV=${ENV} | BASE_URL=${baseURL}`);

export default defineConfig({
    testDir: "./tests",
    use: {
        headless : false,
        launchOptions: {
            slowMo:500,
            },
        baseURL,
        screenshot : "only-on-failure",
        video: "retain-on-failure",
    },
});