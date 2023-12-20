import { routes } from '@/router'
import { defineStore } from 'pinia'
import { computed } from 'vue'

const generateMenuList = (routes) => {
  return routes.filter((item) => {
    if (item.meta?.title && item.meta?.isMenu !==false) {
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
  const include = computed(() => findKeepAlive(routes))
  return { menuList, routes, include }
})
 

function findKeepAlive (routes){
  return routes.reduce((pre, route) => {
    if(route.children){
      let temp = findKeepAlive(route.children)
      if(temp.length>0){
        pre.push(route.name)
      }
      pre = pre.concat(temp)
    }else{
      if(route.meta?.isKeepAlive){
        pre.push(route.name)
      }
    } 
    return pre
  }, [])
}