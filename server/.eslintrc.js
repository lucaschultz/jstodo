module.exports = {
  env: {
    node: true,
    es6: true,
    es2020: true
  },
  extends: [
    "eslint:recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module"
  },
  rules: {
    "indent": [
      "off",
      2
    ],
    "quotes": [
      "off",
      "single"
    ],
    semi: [
      "warn",
      "always"
    ],
    "comma-dangle": [
      "warn",
      "only-multiline"
    ],
    "func-style": [
      "warn",
      "declaration"
    ],
    "func-names": [
      "warn",
      "as-needed"
    ],
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "no-var": "error",
    "eqeqeq": "error",
    "no-eval": "error",
  }
};
