/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ["prettier", "unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",

      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
      ],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-floating-promises": ["warn"],
        "@typescript-eslint/ban-types": [
          "error",
          {
            types: {
              "React.FC": { message: "React.FC is not recommended anymore." },
            },
          },
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "regex/invalid": [
          "error",
          [
            {
              id: "excessiveRelativePath",
              message:
                "Relative imports are only allowed up to two levels up. Use an absolute path instead or rethink the folder structure.",
              regex: "(\\.\\.\\/){3,}",
            },
          ],
        ],
      },
    },
  ],
  rules: {
    "no-undef": "error",
    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "error",
    "import/no-unresolved": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
};
