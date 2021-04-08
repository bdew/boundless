module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "eqeqeq": "warn",
  }
};