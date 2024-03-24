import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { dirname } from "path";
import { fileURLToPath } from "url";

const filePath = dirname(fileURLToPath(import.meta.url));
const bootstrapPath = `${filePath}/node_modules/bootstrap`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],   
    server: {
        port: 8081,
    },
})
