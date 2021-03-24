module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'sort-keys-fix'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: '.',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  globals: {
    document: true,
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-var-requires': 0,
    'camelcase': 'off',
    'no-useless-constructor': 'off',
    'react/prop-types': 'off',
    'react/jsx-indent': 'off',
    'no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'react/jsx-props-no-spreading': 0,
    'newline-per-chained-call': 0,
    'operator-linebreak': 0,
    'no-console': 0,
    'class-methods-use-this': 0,
    'indent': 'off',
    'import/extensions': 0,
    'max-len': 0,
    'max-classes-per-file': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'implicit-arrow-linebreak': 0,
    'react-hooks/exhaustive-deps': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: true }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '_.+', argsIgnorePattern: '_.+' }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-restricted-imports': [
      2,
      {
        paths: [
          {
            name: 'lodash',
            message: "Don't use import from root. Use for examples 'lodash/someImportName'",
          },
          {
            name: '@material-ui/core',
            message: "Don't use import from root. Use for examples '@material-ui/core/someImportName'",
          },
          {
            name: '@material-ui/icons',
            message: "Don't use import from root. Use for examples '@material-ui/icons/someImportName'",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['packages/i18n/src/locales/*.ts'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'error',
        'react-i18n/rule-name': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules', 'bundle', 'webpack.prod.js', 'webpack.dev.js'],
};
