module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'unused-imports'],

  rules: {
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
