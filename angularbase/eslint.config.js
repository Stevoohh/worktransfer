// @ts-check
const eslint = require("@eslint/js");
const angular = require("angular-eslint");
const tseslint = require("typescript-eslint");
const olbeslint = require("@olb/eslint-config");

module.exports = tseslint.config(
  ...olbeslint.configs.recommended,
  {
    files: ["**/*.ts"],
    extends: [],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ]
    }
  },
  {
    files: ["**/*.html"],
    extends: [],
    rules: {}
  }
);
