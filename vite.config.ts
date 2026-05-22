import path from "node:path";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            autoCodeSplitting: true,
            target: "react",
        }),
        tailwindcss(),
        react(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
    resolve: {
        alias: {
            // oxlint-disable-next-line unicorn/prefer-module
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
