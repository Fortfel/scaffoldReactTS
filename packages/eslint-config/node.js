import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for node applications.
 *
 * @type {import('eslint').Linter.Config[]} */
export const config = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]
