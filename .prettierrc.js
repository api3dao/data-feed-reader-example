module.exports = {
  bracketSpacing: true,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  plugins: ['prettier-plugin-solidity'],
  overrides: [
    {
      files: '*.sol',
      options: {
        parser: 'slang',
        printWidth: 80,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false,
      },
    },
  ],
};
