import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import react from 'eslint-plugin-react'

const config = [
  {
    ignores: ['.next/', 'out/', 'build/', 'coverage/', 'playwright-report/', 'test-results/', 'next-env.d.ts']
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...tseslint.configs['flat/recommended'],
  react.configs.flat.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: true,
          multiline: 'last',
          ignoreCase: false,
          noSortAlphabetically: false,
          reservedFirst: true,
          locale: 'auto'
        }
      ],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-require-imports': 'off',
      '@next/next/no-img-element': 'off'
    }
  }
]

export default config
