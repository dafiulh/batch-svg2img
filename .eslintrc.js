module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'google'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'max-len': 'off',
    'require-jsdoc': 'off',
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never']
  }
};
