/** @type {import('tailwindcss').Config} */

const colorKeys = ['primary', 'success', 'warning', 'danger', 'link']
const colors = colorKeys.reduce((pre, name) => {
  pre[name] = {
    base: `rgb(var(--${name}-6))`,
    hover: `rgb(var(--${name}-5))`,
    click: `rgb(var(--${name}-7))`,
    spec: `rgb(var(--${name}-4))`,
    disabled: `rgb(var(--${name}-3))`,
    tdisabled: `rgb(var(--${name}-2))`,
    light: `rgb(var(--${name}-1))`,
  }
  return pre
}, {})
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      // border
      bbase: `var(--color-border-1)`,
      bnormal: `var(--color-border-2)`,
      bdeep: `var(--color-border-3)`,
      bheavy: `var(--color-border-4)`,
      // fill
      fbase: `var(--color-fill-1)`,
      fnormal: `var(--color-fill-2)`,
      fdeep: `var(--color-fill-3)`,
      fheavy: `var(--color-fill-4)`,
      // text
      title: `var(--color-text-1)`,
      content: `var(--color-text-2)`,
      desc: `var(--color-text-3)`,
      assist: `var(--color-text-4)`,
      // bg
      over: `var(--color-bg-1)`,
      over1: `var(--color-bg-2)`,
      over2: `var(--color-bg-3)`,
      over3: `var(--color-bg-4)`,
      popup: `var(--color-bg-5)`,
      white: `var(--color-white)`,
      transparent: 'transparent',
      black20: 'rgba(0,0,0,0.2)',

      gc: {
        primary: 'rgba(var(--gc-primary))',
        primary80: 'rgba(var(--gc-primary),0.8)',
        primary50: 'rgba(var(--gc-primary),0.5)',
        primary30: 'rgba(var(--gc-primary),0.3)',
        primary10: 'rgba(var(--gc-primary),0.1)',
        red: '#F20F0F',
        orange: '#f94e04',
        blue: '#2586A4',
        cyan: '#00E5C9',
        text: 'rgba(234,223,223,1)',
      },
    },
    extend: {},
  },
  plugins: [],
}
