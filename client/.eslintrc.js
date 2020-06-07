module.exports = {
  env: {
    browser: true,
    es6: true,
    es2020: true
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    indent: [
      'warn',
      2
    ],
    quotes: [
      'warn',
      'single'
    ],
    semi: [
      'warn',
      'always'
    ],
    'comma-dangle': [
      'warn',
      'only-multiline'
    ],
    'func-style': [
      'warn',
      'declaration'
    ],
    'func-names': [
      'warn',
      'as-needed'
    ],
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false
      }
    ],
  }
};
