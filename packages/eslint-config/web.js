import globals from 'globals'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for web applications.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  eslintPluginJsxA11y.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]
