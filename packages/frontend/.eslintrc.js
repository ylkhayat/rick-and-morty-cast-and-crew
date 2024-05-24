/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ['plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'error',
  },
};

module.exports = config;
