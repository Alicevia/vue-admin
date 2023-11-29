import js from '@eslint/js'
import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'node:url'
import babelParser from '@babel/eslint-parser'
import vue from 'eslint-plugin-vue'
const { default: autoImportApi } = await import('./eslintrc-auto-import.json', { assert: { type: 'json' } })
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})
export default [
 
  ...compat.plugins('vue'),
  ...compat.extends('plugin:vue/vue3-recommended'),
  ...compat.extends('plugin:jsx-a11y/recommended'),
  {
    files: ['**/*.jsx', '**/*.tsx'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
          
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          // your babel options
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-import-attributes-to-assertions'],
        },
      },
    },
  },
  {
    files: ['**/*.vue'],
 
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'never',
            normal: 'never',
            component: 'never',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never',
        },
      ],
      'vue/html-indent': [
        'error',
        'tab',
        {
          alignAttributesVertically: false,
        },
      ],
      'vue/require-v-for-key': 1,
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'ignore',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 3,
        },
      ],
    },
    languageOptions: {
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        defineModel: 'readonly',
        defineSlots: 'readonly',
        defineOptions: 'readonly',
        definePage: 'readonly',
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...autoImportApi.globals,
      },
    },
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 1,
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'quote-props': ['error', 'as-needed'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'space-before-function-paren': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
      'key-spacing': ['error', { mode: 'strict' }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }], 
    },
  },
]
