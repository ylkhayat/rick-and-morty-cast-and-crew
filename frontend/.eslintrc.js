/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
