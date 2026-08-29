import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Patterns intentionnels (hydratation, navigation, localStorage) — trop stricts en erreur.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
    },
  },
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'src/payload-types.ts',
    'src/app/(payload)/admin/importMap.js',
    'public/**',
  ]),
])
