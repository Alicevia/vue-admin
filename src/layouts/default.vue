<template>
	<a-layout class="h-full">
		<a-layout-header class=" bg-fbase">
			<a-page-header :show-back="false">
				<template #title>
					<icon-xigua-color></icon-xigua-color> ALICEVIA SYSTEM
				</template>
				<template #subtitle>
					刷新
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
					<component :is="renderMenuList"></component>
				</a-scrollbar>
			</a-layout-sider>
			<a-layout-content>
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

const { isFullscreen,  toggle } = useFullscreen(document.documentElement)
const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

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

const renderMenuList = () => {
  return h(Menu, menuState,
    () => userStore.menuList.map(renderMenuItem))
}
const renderMenuItem = (menu) => {
  if (menu.children) {
    return h(SubMenu, { title: menu.title, key: menu.name }, {
      default: () => menu.children.map(renderMenuItem),
      icon: () => suspense(menu.icon),
    })
  }
  return h(MenuItem, { key: menu.name }, {
    default: () => menu.title,
    icon: () => suspense(menu.icon),
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
