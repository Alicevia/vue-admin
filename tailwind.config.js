/** @type {import('tailwindcss').Config} */

const colorKeys = ['brand', 'warning', 'error', 'success'  ]
const colors = colorKeys.reduce((pre, name) => {
  const keys= ['hover', 'focus', 'active', 'disabled', 'light']
  keys.forEach((key => {
    pre[key]=`rgb(var(--td-${name}-color-${key}))`
  }))
  pre['base']=`rgb(var(--td-${name}-color))`
  
  return pre
}, {})
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      // border
      b1: `var(--td-gray-color-3)`,
      b2: `var(--td-gray-color-4)`,
  
      // text
      primary: `var(--td-text-color-primary)`,
      sec: `var(--td-text-color-secondary)`,
      placeholder: `var(--td-text-color-placeholder)`,
      disabled: `var(--td-text-color-disabled)`,
      anti: `white`, 
      brand: `var(--td-text-color-brand)`, 
      link: `var(--td-text-color-link)`, 
      // title: `var(--color-text-1)`,
      // content: `var(--color-text-2)`,
      // desc: `var(--color-text-3)`,
      // assist: `var(--color-text-4)`,
      // bg
      page: `var(--td-bg-color-page)`,
      container: `var(--td-bg-color-container)`,
      'container-hover': `var(--td-bg-color-container-hover)`,
      'container-active': `var(--td-bg-color-container-active)`,
      'container-select': `var(--td-bg-color-container-select)`,
      container2: `var(--td-bg-color-secondarycontainer)`,
      'container2-hover': `var(--td-bg-color-secondarycontainer-hover)`,
      'container2-active': `var(--td-bg-color-secondarycontainer-active)`,
      'container2-select': `var(--td-bg-color-secondarycontainer-select)`,
      component: `var(--td-bg-color-component)`,
      'component-hover': `var(--td-bg-color-component-hover)`,
      'component-active': `var(--td-bg-color-component-active)`,
      'component-disabled': `var(--td-bg-color-component-disabled)`,
      'component-border': `var(--td-component-border)`,
      component2: `var(--td-bg-color-secondarycomponent)`,
      'component2-hover': `var(--td-bg-color-secondarycomponent-hover)`,
      'component2-active': `var(--td-bg-color-secondarycomponent-active)`,

      transparent: 'transparent',
      black20: 'rgba(0,0,0,0.2)',
 
    },
    extend: {},
  },
  plugins: [],
}
