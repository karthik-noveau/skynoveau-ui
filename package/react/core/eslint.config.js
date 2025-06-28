import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    ignores: ["dist", "node_modules", "eslint.config.js"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z_]" },
      ],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ✅ Auto sort and group imports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"], // 1. External packages
            ["^\\u0000"], // 2. Side effects
            ["^@/(.*)$"], // 3. Absolute paths (e.g. @/components)
            ["^\\.{1,2}/"], // 4. Relative
            ["^.+\\.module\\.(css|scss)$", "^.+\\.(css|scss)$"], // 5. CSS
            ["^.+\\.(png|jpg|jpeg|gif|svg|webp|mp4|mp3|ogg|wav)$"], // 6. Assets
          ],
        },
      ],

      "simple-import-sort/exports": "error",

      // ✅ Add newline between import groups
      "import/newline-after-import": ["error", { count: 1 }],
    },
  },
];
