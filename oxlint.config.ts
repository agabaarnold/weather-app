import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import remix from "ultracite/oxlint/remix";

export default defineConfig({
    extends: [core, react, remix],
    ignorePatterns: ["src/lib/authClient.ts", "./src/routeTree.gen.ts"],
    rules: {
        "func-style": "off",
        "no-use-before-define": "off",
        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase",
                ignore: ["./src/lib/authClient.ts"],
            },
        ],
    },
});