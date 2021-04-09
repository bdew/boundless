module.exports = {
  settings: {
    react: {
      version: "detect"
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    "@typescript-eslint",
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "react/prop-types": "off",
    "eqeqeq": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "comma-dangle": ["warn", { functions: "never", arrays: "always-multiline", objects: "always-multiline", imports: "always-multiline", exports: "always-multiline" }],
  },
  ignorePatterns: [
    "**/*.css", "**/*.json"
  ]
};