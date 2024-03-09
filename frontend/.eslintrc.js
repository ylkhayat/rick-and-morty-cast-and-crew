module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react/recommended'],
  plugins: ['react', 'prettier', 'unused-imports'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
