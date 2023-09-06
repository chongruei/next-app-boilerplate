module.exports = {
  trailingComma: 'none',
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  importOrder: [
    '^(react/(.*)$)|^(react-(.*)$)|^(react$)|^(next/(.*)$)|^(next$)|^(@next/(.*)$)|^(next-(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/utils/(.*)$',
    '^@/',
    '^[./]',
    '^[.]/[-a-zA-Z0-9_]+[.](css|scss|less)$' // end with css etc
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts'
}
