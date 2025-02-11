// import globals from "globals";
// import pluginJs from "@eslint/js";
// import importPlugin from "eslint-plugin-import";

// /** @type {import('eslint').Linter.FlatConfig[]} */
// export default [
//   {
//     files: ["**/*.js"],
//     languageOptions: { sourceType: "commonjs" },
//     plugins: {
//       import: importPlugin,
//     },
//     rules: {
//       "import/no-unresolved": "error", // Deteksi case sensitivity dalam import
//     },
//   },
//   {
//     languageOptions: { globals: globals.browser },
//   },
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node, ...globals.browser } // Tambahkan globals.node
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": "error", // Deteksi case sensitivity dalam import
    },
  },
  pluginJs.configs.recommended,
];
