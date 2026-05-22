import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
    ...ultracite,
    sortImports: true,
    sortTailwindcss: true,
    tabWidth: 4,
});