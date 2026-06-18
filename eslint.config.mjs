import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    settings: {
      'import/extensions': [
        '.vue',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.mjs',
        '.cjs',
      ],
      'import/resolver': {
        node: {
          extensions: [
            '.vue',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.mjs',
            '.cjs',
          ],
        },
      },
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/no-cycle': ['error', { ignoreExternal: true }],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  globalIgnores([
    '.nuxt/**',
    '.output/**',
    'dist/**',
    'node_modules/**',
    'scripts/**',
  ]),
]);
