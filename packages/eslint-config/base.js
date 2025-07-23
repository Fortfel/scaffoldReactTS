import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  // Global ignores
  globalIgnores(['dist']),

  // Base configs for all files
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginUnicorn.configs.recommended,

  // Global rule overrides
  {
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-query-selector': 'off',
    },
  },

  // JavaScript files - NO type-aware rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },

  // TypeScript files - WITH type-aware rules
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true, // Only for TypeScript files
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      tsdoc: eslintPluginTsdoc,
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',

      quotes: ['error', 'single'],
      semi: ['error', 'never'],

      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],

      'no-restricted-syntax': [
        'error',
        // Ban all enums:
        {
          selector: 'TSEnumDeclaration',
          message:
            'Use const assertion or a string union type instead. https://mkosir.github.io/typescript-style-guide/#enums--const-assertion',
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
          readonly: 'array',
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          // Generic type parameter must start with letter T, followed by any uppercase letter.
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: {
            regex: '^T[A-Z]',
            match: true,
          },
        },
      ],
      'tsdoc/syntax': 'warn',
    },
  },
  {
    // Override for specific files
    // files: ['src/assets/**/*', 'server/**/*'],
    // rules: {
    //   'import/no-default-export': 'off',
    // },
  },
]
