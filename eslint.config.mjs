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
      globals: {
        // Nuxt auto-imports
        useHead: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useNuxtApp: 'readonly',
        useState: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      // Allow single-word component names for pages (index, login, etc.)
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'login', 'register', 'space', 'default', 'error', 'materials', 'templates', 'designer', 'resize'],
      }],
      'no-undef': 'off',
      // Allow poster-design open source code patterns
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      'no-constant-binary-expression': 'off',
      'no-empty': 'off',
      'no-case-declarations': 'off',
      'vue/no-ref-as-operand': 'off',
      'vue/no-mutating-props': 'off',
    },
  },
  globalIgnores([
    '.nuxt/**',
    '.output/**',
    'dist/**',
    'node_modules/**',
    'scripts/**',
    // Ignore poster-design open source code (needs separate integration)
    'app/components/poster-design/**',
    'app/poster-store/**',
    'app/common/**',
    'app/utils/**',
    'app/types/**',
    'app/api/poster-api/**',
    // Ignore 迅排设计 open source project (Vue2 legacy code)
    'design-editor/**',
  ]),
]);
