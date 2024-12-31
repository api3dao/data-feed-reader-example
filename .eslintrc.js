module.exports = {
  env: {
    mocha: true,
  },
  extends: ['plugin:@api3/eslint-plugin-commons/universal'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {
    'no-console': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-anonymous-default-export': 'off',
  },
};
