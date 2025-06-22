export default {
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 120,
  singleQuote: true,
  semi: true,
  overrides: [
    {
      files: ['**.*.scss', '*.scss', '**.*.css', '*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
