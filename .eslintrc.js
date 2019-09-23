
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-unused-vars": ["error", { "args": "none" }],
    "no-underscore-dangle": [0],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "no-underscore-dangle": [0],
    "linebreak-style": 0
  },
};
