import globals from 'globals'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReact from 'eslint-plugin-react'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginReactCompiler from 'eslint-plugin-react-compiler'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import('eslint').Linter.Config[]} */
export const config = [
  ...baseConfig,
  eslintPluginJsxA11y.flatConfigs.recommended,
  pluginReactRefresh.configs.vite,
  pluginReactHooks.configs['recommended-latest'],
  pluginReact.configs.flat.recommended, // This is not a plugin object, but a shareable config object
  pluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
  pluginReactCompiler.configs.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    settings: { react: { version: 'detect' } },
    rules: {
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
    },
  },
  // Specific override for vite.config.ts to use node config
  {
    files: ['**/vite.config.ts'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.node.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        },
      },
    },
  },
]
