module.exports = {
  env: {
    commonjs: true,
    es2021: true,

    node: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@stylistic/eslint-plugin-js"],
  extends: "eslint:recommended",
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/linebreak-style": ["error", "windows"],
    "@stylistic/js/quotes": ["error", "single"],
    "@stylistic/js/semi": ["error", "never"],
    "no-trailing-spaces": "error",
    eqeqeq: "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
