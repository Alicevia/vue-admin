import js from '@eslint/js'
import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'node:url'
import autoImportApi from './eslintrc-auto-import.json' assert { type: 'json' }
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})
export default [
  ...compat.plugins('vue'),
  ...compat.extends('plugin:vue/vue3-recommended'),

  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
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
        ...autoImportApi.globals,
      },
    },
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 1,
    },
  },
]
