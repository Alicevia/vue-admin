import { routes } from '@/router'
import { defineStore } from 'pinia'

const generateMenuList = (routes) => {
  return routes.filter((item) => {
    if (item.title) {
      if (item.children && item.children.length > 0) {
        item.children = generateMenuList(item.children)
      }
      return true
    }
  })
}
export const useUserStore = defineStore('user', () => {
  const menuList = computed(() => {
    return generateMenuList(routes)
  })
  return { menuList }
})
