import { createRouter, createWebHistory } from 'vue-router/auto'

import { routes } from 'vue-router/auto/routes'
import { setupLayouts } from './setupLayouts'
export const router = createRouter({
  history:createWebHistory(),
  extendRoutes:setupLayouts
})
export {routes}