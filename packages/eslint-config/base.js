import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import eslintPluginTsdoc from 'eslint-plugin-tsdoc'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginUnicorn.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
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

      'no-restricted-syntax': [
        'error',
        // Ban all enums:
        {
          selector: 'TSEnumDeclaration',
          message:
            'Use const assertion or a string union type instead. https://mkosir.github.io/typescript-style-guide/#enums--const-assertion',
        },
      ],
      'import/no-default-export': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
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
    ignores: ['dist/**'],
  },
  {
    // Override for specific files
    // files: ['src/assets/**/*', 'server/**/*'],
    // rules: {
    //   'import/no-default-export': 'off',
    // },
  },
]
