<template>
	<div class="h-full flex-1 ">
		<a-x></a-x>
	</div>
</template>

<script setup>
import { useTypewriter } from '@/hooks'
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'
 
definePage({
  title: '首页',
  icon: () => import('@arco-design/web-vue/es/icon/icon-apps'),
})
 
 
</script>
<style scoped></style>