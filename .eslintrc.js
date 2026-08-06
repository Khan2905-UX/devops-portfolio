module.exports = {
  env: {
    node: true,
    es2024: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "script",
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
  },
};
