<template>
  <a-layout class="h-full">
    <a-layout-header>
      <a-page-header title="ArcoDesign" subtitle="ArcoDesign Vue 2.0">
        <template #extra>
          <a-button>退出</a-button>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout class="overflow-hidden">
      <a-layout-sider collapsible style="width: auto;">
        <a-scrollbar style="overflow: auto" class="h-[calc(100vh-112px)]">
          <a-menu :style="{ width: '200px', borderRadius: '4px' }" :collapsed="collapsed" :default-open-keys="['0']"
            :default-selected-keys="['0_2']">
            <a-sub-menu key="0">
              <template #icon>
                <icon-apps></icon-apps>
              </template>
              <template #title>
                Navigation 1
              </template>
              <a-menu-item key="0_0">
                Menu 1
              </a-menu-item>
              <a-menu-item key="0_1">
                Menu 2
              </a-menu-item>
              <a-menu-item key="0_2">
                Menu 3
              </a-menu-item>
              <a-menu-item key="0_3">
                Menu 4
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="1">
              <template #icon>
                <icon-bug></icon-bug>
              </template>
              <template #title>
                Navigation 2
              </template>
              <a-menu-item key="1_0">
                Menu 1
              </a-menu-item>
              <a-menu-item key="1_1">
                Menu 2
              </a-menu-item>
              <a-menu-item key="1_2">
                Menu 3
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="2">
              <template #icon>
                <icon-bulb></icon-bulb>
              </template>
              <template #title>
                Navigation 3
              </template>
              <a-menu-item key="2_0">
                Menu 1
              </a-menu-item>
              <a-menu-item key="2_1">
                Menu 2
              </a-menu-item>
              <a-sub-menu key="2_2" title="Navigation 4">
                <a-menu-item key="2_2_0">
                  Menu 1
                </a-menu-item>
                <a-menu-item key="2_2_1">
                  Menu 2
                </a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </a-scrollbar>
      </a-layout-sider>
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </a-layout>
  </a-layout>
</template>
  
<script setup>

</script>
<style  scoped></style>