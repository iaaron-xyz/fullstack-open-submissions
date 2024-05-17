import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: "error",
      curly: "warn",
      "no-irregular-whitespace": "warn",
    },
  },
  {
    ignores: ["dist/"],
  },
];
