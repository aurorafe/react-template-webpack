// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
      js: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended"
  ],
  plugins: [
    'jsx-a11y'
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved': 0,
    'no-console': 0,
    // allow semi
    'semi': 0,
    // allow global require
    'global-require': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'globals': {
    'config': true
  }
};
