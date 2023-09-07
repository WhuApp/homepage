export default {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};