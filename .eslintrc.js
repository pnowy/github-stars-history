module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": [2, {"args": "all", "argsIgnorePattern": "^_"}]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
