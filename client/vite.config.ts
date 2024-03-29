import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],   
    server: {
        port: 8081,
    },
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/components"),
            "@helpers": path.resolve(__dirname, "src/helpers"),
            "@interfaces": path.resolve(__dirname, "src/interfaces"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@scss": path.resolve(__dirname, "src/scss"),
            "@stores": path.resolve(__dirname, "src/stores"),
        },
    },
});
