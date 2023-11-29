import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: '',
  })
 
  return {
    isDark: readonly(isDark),
    toggleTheme: useToggle(isDark),
  }
})
