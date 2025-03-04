// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules', 'dist']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      semi: 'off', 
      '@typescript-eslint/semi': 'on', 
      'prettier/prettier': [
        'error',
        {
          semi: false,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          trailingComma: 'none',
          bracketSpacing: true
        }
      ]
    }
  }
]
