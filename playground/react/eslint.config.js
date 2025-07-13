// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
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
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      import: eslintPluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // ❌ Disable prop-types rule (not needed)
      "react/prop-types": "off",

      // ✅ Turn off the old rule that expects `React` to be imported
      "react/react-in-jsx-scope": "off",

      // ✅ React Refresh HMR safety
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
            ["^@/(.*)$"], // 3. Aliases like @/components
            ["^\\.{1,2}/"], // 4. Relative imports
            ["^.+\\.module\\.(css|scss)$", "^.+\\.(css|scss)$"], // 5. CSS files
            ["^.+\\.(png|jpg|jpeg|gif|svg|webp|mp4|mp3|ogg|wav)$"], // 6. Assets
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // ✅ Enforce newline between import groups
      "import/newline-after-import": ["error", { count: 1 }],
    },
  },
];
