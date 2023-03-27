module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
    {
      files: ['src/redux/slices/*Slice.js'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    quotes: 0,
    'no-console': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'max-len': ['error', { code: 100 }],
    'jsx-a11y/label-has-associated-control': 0,
    'dot-notation': 0,
  },
};
