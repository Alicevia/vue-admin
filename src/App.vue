<template>
  <a-config-provider :global="true">
    <router-view v-slot="{ Component }">
      <transition mode="out-in">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script setup>
import { useUserStore } from '@/store'
import { useRouter } from 'vue-router'
console.log(useRouter().getRoutes())

</script>
<style scoped></style>