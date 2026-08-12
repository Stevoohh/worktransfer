// @ts-check
const eslint = require("@eslint/js");
const angular = require("angular-eslint");
const tseslint = require("typescript-eslint");


module.exports = tseslint.config(
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
