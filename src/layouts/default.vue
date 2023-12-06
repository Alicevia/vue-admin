<template>
	<a-layout class="h-full">
		<a-layout-header class=" bg-fbase">
			<a-page-header :show-back="false">
				<template #title>
					<icon-xigua-color></icon-xigua-color> ALICEVIA SYSTEM
				</template>
				<template #subtitle>
					<a-breadcrumb>
						<template #separator>
							<icon-right></icon-right>
						</template>

						<a-breadcrumb-item v-for="item of breadcrumbList" :key="item.name">
							<a-trigger trigger="hover">
								<span>{{ item.title }}</span>
								<template #content>
									<component :is="renderMenuListInBreadcrumb([item])"></component>
								</template>
							</a-trigger>
						</a-breadcrumb-item>
					</a-breadcrumb>
				</template>
				<template #extra>
					<a-space>
						<a-button shape="circle" @click="toggle">
							<template #icon>
								<icon-fullscreen-exit v-if="isFullscreen"></icon-fullscreen-exit> 
								<icon-fullscreen v-else></icon-fullscreen>
							</template>
						</a-button>
						<a-button shape="circle" @click="themeStore.toggleTheme()">
							<template #icon>
								<icon-sun-fill v-if="themeStore.isDark"></icon-sun-fill>
								<icon-moon-fill v-else></icon-moon-fill> 
							</template>
						</a-button>
						<a-dropdown position="bl" trigger="hover">
							<a-avatar :size="30" :style="{ backgroundColor: '#14a9f8' }">
								<IconUser></IconUser>
							</a-avatar>
							<template #content>
								<a-doption>个人中心</a-doption>
								<a-doption>退出</a-doption>
							</template>
						</a-dropdown>
					</a-space>
				</template>
			</a-page-header>
		</a-layout-header>
    
		<a-layout class="overflow-hidden">
			<a-layout-sider v-model:collapsed="collapsed" collapsible>
				<a-scrollbar style="overflow: auto" class="h-[calc(100vh-112px)]">
					<component :is="renderMenuList(userStore.menuList)"></component>
				</a-scrollbar>
			</a-layout-sider>
			<a-layout-content class="flex flex-col p-2 gap-2">
				<nav-record></nav-record>

				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</router-view>  
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script setup>
import { useUserStore, useThemeStore } from '@/store'
import { Menu, MenuItem, SubMenu } from '@arco-design/web-vue'
import { Suspense, computed, defineAsyncComponent, h, onActivated, reactive, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import NavRecord from './components/nav-record.vue'

const { isFullscreen,  toggle } = useFullscreen(document.documentElement)
const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

const findMenuByName = (menu, name) => {
  return menu.find(item => {
    if(item.name==name) return true
    if(item.children) return !!findMenuByName(item.children, name)
  })
}
 
const breadcrumbList = computed(() => {
  const [name]=menuState.selectedKeys
  if(!currentMenu.value) return []
 
  return flatMenu([currentMenu.value], name)??[]
})
 
const flatMenu = (menu, name, data=[]) => {
  for (let index = 0; index < menu.length; index++) {
    const item = menu[index]
    data.push(item)
    if(item.name==name) return data
    if(item.children){
      
      let res =  flatMenu(item.children, name, data)
      if(res){
        return res
      }
    }
    data.pop()
  }
}


const currentMenu = computed(() => {
  const [name]=menuState.selectedKeys
  return  findMenuByName(userStore.routes, name)
})

const collapsed = ref(false)
const menuState = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  'onUpdate:openKeys' (x){
    menuState.openKeys=x
  },
  'onUpdate:selectedKeys' (x){
    menuState.selectedKeys=x
  },
  onMenuItemClick (path) {
    router.push({  path })
  },
})
watchEffect(() => {
  const matchedPath = route.matched.filter(route => route.name).map(route => route.name)
  menuState.selectedKeys= matchedPath.slice(-1)
  menuState.openKeys= matchedPath.slice(0, -1)
})

const renderMenuList = (menuList) => {
  return h(Menu, menuState,
    () => menuList.map((item) => renderMenuItem(item)))
}
const renderMenuListInBreadcrumb = (menuList) => {
  return h(Menu, { mode: 'pop',  onMenuItemClick: menuState.onMenuItemClick },
    () => menuList.map((item) => renderMenuItem(item, false)))
}

const renderMenuItem = (menu, renderIcon=true) => {
  if (menu.children) {
    return h(SubMenu, { title: menu.title, key: menu.name }, {
      default: () => menu.children.map((item) => renderMenuItem(item, renderIcon)),
      icon: renderIcon? () => suspense(menu.icon):null,
    })
  }
  return h(MenuItem, { key: menu.name }, {
    default: () => menu.title,
    icon: renderIcon?() => suspense(menu.icon):null,
  })
}

const suspense = (c) => {
  if(!c) return null
  return h(Suspense, null, {
    default: () => h(defineAsyncComponent(c)),
  })
}
</script>
<style scoped></style>
